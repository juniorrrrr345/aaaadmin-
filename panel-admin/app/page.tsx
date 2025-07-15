'use client'

import { useState } from 'react'
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import ProductManager from './components/ProductManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { name: 'Ventes totales', value: '€12,345', icon: CurrencyDollarIcon, change: '+12%', changeType: 'positive' },
    { name: 'Produits', value: '156', icon: ShoppingBagIcon, change: '+5%', changeType: 'positive' },
    { name: 'Clients', value: '2,847', icon: UsersIcon, change: '+8%', changeType: 'positive' },
    { name: 'Commandes', value: '89', icon: ChartBarIcon, change: '+15%', changeType: 'positive' },
  ]

  const navigation = [
    { name: 'Dashboard', href: '#', icon: ChartBarIcon, current: activeTab === 'dashboard' },
    { name: 'Produits', href: '#', icon: ShoppingBagIcon, current: activeTab === 'products' },
    { name: 'Commandes', href: '#', icon: CurrencyDollarIcon, current: activeTab === 'orders' },
    { name: 'Clients', href: '#', icon: UsersIcon, current: activeTab === 'customers' },
    { name: 'Paramètres', href: '#', icon: CogIcon, current: activeTab === 'settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
              <span className="ml-2 text-sm text-gray-500">Qencorroe</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name.toLowerCase())}
                  className={`${
                    item.current
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group w-full flex items-center px-3 py-2 text-sm font-medium border-l-4`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
                
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  {stats.map((item) => (
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

                {/* Recent Activity */}
                <div className="card">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Nouvelle commande #1234 reçue</span>
                      <span className="text-xs text-gray-400">Il y a 5 min</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Produit "T-shirt Premium" ajouté</span>
                      <span className="text-xs text-gray-400">Il y a 15 min</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Paiement en attente #1233</span>
                      <span className="text-xs text-gray-400">Il y a 1 heure</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <ProductManager />
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Commandes</h2>
                <div className="card">
                  <p className="text-gray-600">Interface de gestion des commandes à implémenter</p>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Clients</h2>
                <div className="card">
                  <p className="text-gray-600">Interface de gestion des clients à implémenter</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>
                <div className="card">
                  <p className="text-gray-600">Interface des paramètres à implémenter</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}