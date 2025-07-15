'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface Stats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  recentOrders: any[]
  lowStockProducts: any[]
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    const response = await apiClient.getStats()
    if (response.success && response.data) {
      setStats(response.data as Stats)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Impossible de charger les statistiques</p>
      </div>
    )
  }

  const statsData = [
    { 
      name: 'Ventes totales', 
      value: `€${stats.totalSales.toFixed(2)}`, 
      icon: CurrencyDollarIcon, 
      change: '+12%', 
      changeType: 'positive' 
    },
    { 
      name: 'Produits', 
      value: stats.totalProducts.toString(), 
      icon: ShoppingBagIcon, 
      change: '+5%', 
      changeType: 'positive' 
    },
    { 
      name: 'Clients', 
      value: stats.totalCustomers.toString(), 
      icon: UsersIcon, 
      change: '+8%', 
      changeType: 'positive' 
    },
    { 
      name: 'Commandes', 
      value: stats.totalOrders.toString(), 
      icon: ChartBarIcon, 
      change: '+15%', 
      changeType: 'positive' 
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsData.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{item.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commandes récentes */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Commandes récentes</h3>
          <div className="space-y-4">
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Commande #{order.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customerName} - €{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune commande récente</p>
            )}
          </div>
        </div>

        {/* Produits en rupture */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Stock faible</h3>
          <div className="space-y-4">
            {stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stock: {product.stock} unités
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-600 font-medium">
                    Stock faible
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun produit en stock faible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}