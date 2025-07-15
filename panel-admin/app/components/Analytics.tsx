'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  EyeIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface AnalyticsData {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  conversionRate: number
  averageOrderValue: number
  topProducts: any[]
  salesByMonth: any[]
  customerGrowth: any[]
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    loadAnalytics()
  }, [selectedPeriod])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getAnalytics(selectedPeriod)
      if (response.success && response.data) {
        setAnalytics(response.data as AnalyticsData)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error)
    }
    setLoading(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  // Mock data
  const mockAnalytics: AnalyticsData = {
    totalSales: 12450.75,
    totalOrders: 89,
    totalCustomers: 156,
    conversionRate: 3.2,
    averageOrderValue: 139.89,
    topProducts: [
      { name: 'T-shirt Premium', sales: 45, revenue: 1349.55 },
      { name: 'Casque Audio Pro', sales: 32, revenue: 2879.68 },
      { name: 'Montre Connectée', sales: 28, revenue: 3626.00 },
      { name: 'Sac à dos', sales: 25, revenue: 1125.00 },
      { name: 'Livre électronique', sales: 22, revenue: 439.78 }
    ],
    salesByMonth: [
      { month: 'Jan', sales: 8500 },
      { month: 'Fév', sales: 9200 },
      { month: 'Mar', sales: 8800 },
      { month: 'Avr', sales: 10200 },
      { month: 'Mai', sales: 11500 },
      { month: 'Juin', sales: 12450 }
    ],
    customerGrowth: [
      { month: 'Jan', customers: 120 },
      { month: 'Fév', customers: 135 },
      { month: 'Mar', customers: 142 },
      { month: 'Avr', customers: 148 },
      { month: 'Mai', customers: 152 },
      { month: 'Juin', customers: 156 }
    ]
  }

  const analytics = mockAnalytics

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Analyse détaillée de vos performances</p>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ventes totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalSales)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12.5%</span>
            <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8.3%</span>
            <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Clients</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15.2%</span>
            <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Panier moyen</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.averageOrderValue)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5.7%</span>
            <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des ventes</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.salesByMonth.map((item, index) => {
              const maxSales = Math.max(...analytics.salesByMonth.map(m => m.sales))
              const height = (item.sales / maxSales) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des clients</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.customerGrowth.map((item, index) => {
              const maxCustomers = Math.max(...analytics.customerGrowth.map(c => c.customers))
              const height = (item.customers / maxCustomers) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Produits les plus vendus</h3>
        <div className="space-y-4">
          {analytics.topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} ventes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                <p className="text-sm text-gray-500">Revenus</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Rate & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux de conversion</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatPercentage(analytics.conversionRate)}
            </div>
            <p className="text-gray-500">Visiteurs qui achètent</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${analytics.conversionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Temps moyen sur le site</span>
              <span className="font-medium">4m 32s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pages vues par session</span>
              <span className="font-medium">3.2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Taux de rebond</span>
              <span className="font-medium">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nouveaux clients</span>
              <span className="font-medium">67%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <EyeIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Voir le rapport complet</span>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <CalendarIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Planifier un rapport</span>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <ChartBarIcon className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">Exporter les données</span>
          </button>
        </div>
      </div>
    </div>
  )
}