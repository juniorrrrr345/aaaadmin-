'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  CogIcon
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

export default function Dashboard() {
  const [statsData, setStatsData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getStats()
      if (response.success && response.data) {
        setStatsData(response.data as Stats)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error)
    }
    setLoading(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const mockStats = {
    totalSales: 12450.75,
    totalOrders: 89,
    totalCustomers: 156,
    totalProducts: 24,
    recentOrders: [
      { id: '1', customerName: 'Jean Dupont', total: 89.99, status: 'En cours', createdAt: new Date().toISOString() },
      { id: '2', customerName: 'Marie Martin', total: 129.50, status: 'Livré', createdAt: new Date().toISOString() },
      { id: '3', customerName: 'Pierre Durand', total: 45.00, status: 'En attente', createdAt: new Date().toISOString() }
    ],
    lowStockProducts: [
      { id: '1', name: 'T-shirt Premium', stock: 5 },
      { id: '2', name: 'Casque Audio', stock: 3 },
      { id: '3', name: 'Montre Connectée', stock: 8 }
    ]
  }

  const stats = mockStats

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Vue d'ensemble de votre boutique</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">Ventes totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSales)}</p>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBagIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">+8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">+15%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-500">Produits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="flex items-center text-green-600">
              <ArrowUpIcon className="h-4 w-4" />
              <span className="text-sm font-medium">+5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Commandes récentes</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Voir tout</button>
          </div>
          
          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</p>
                  <div className="flex items-center space-x-1">
                    {order.status === 'Livré' && <CheckCircleIcon className="h-3 w-3 text-green-500" />}
                    {order.status === 'En cours' && <ClockIcon className="h-3 w-3 text-blue-500" />}
                    {order.status === 'En attente' && <ExclamationTriangleIcon className="h-3 w-3 text-yellow-500" />}
                    <span className="text-xs text-gray-500">{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock faible</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Gérer</button>
          </div>
          
          <div className="space-y-4">
            {stats.lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-red-600">Stock faible</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{product.stock} unités</p>
                  <button className="text-xs text-blue-600 hover:text-blue-700">Réapprovisionner</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <PlusIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Ajouter un produit</span>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <EyeIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Voir les commandes</span>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <CogIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Paramètres</span>
          </button>
        </div>
      </div>
    </div>
  )
}