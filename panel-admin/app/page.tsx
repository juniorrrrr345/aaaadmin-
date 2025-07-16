'use client'

import { useState, useEffect } from 'react'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  PhotoIcon,
  CogIcon,
  ShareIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import PageManager from './components/PageManager'
import ProductManager from './components/ProductManager'
import MediaManager from './components/MediaManager'
import SettingsManager from './components/SettingsManager'
import SocialMediaManager from './components/SocialMediaManager'
import Dashboard from './components/Dashboard'
import OrderManager from './components/OrderManager'
import CustomerManager from './components/CustomerManager'
import Analytics from './components/Analytics'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nouvelle commande reçue', time: '2 min', type: 'order' },
    { id: 2, message: 'Stock faible sur T-shirt Premium', time: '5 min', type: 'warning' },
    { id: 3, message: 'Paiement confirmé #1234', time: '10 min', type: 'success' }
  ])

  const navigation = [
    { name: 'Dashboard', href: '#', icon: ChartBarIcon, current: activeTab === 'dashboard' },
    { name: 'Produits', href: '#', icon: ShoppingBagIcon, current: activeTab === 'products' },
    { name: 'Commandes', href: '#', icon: CurrencyDollarIcon, current: activeTab === 'orders' },
    { name: 'Clients', href: '#', icon: UsersIcon, current: activeTab === 'customers' },
    { name: 'Pages', href: '#', icon: HomeIcon, current: activeTab === 'pages' },
    { name: 'Médias', href: '#', icon: PhotoIcon, current: activeTab === 'media' },
    { name: 'Analytics', href: '#', icon: ChartBarIcon, current: activeTab === 'analytics' },
    { name: 'Réseaux sociaux', href: '#', icon: ShareIcon, current: activeTab === 'social' },
    { name: 'Paramètres', href: '#', icon: CogIcon, current: activeTab === 'settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-gray-900">Qencorroe Admin</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <BellIcon className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                  )}
                </button>
              </div>

              {/* Profile dropdown */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <p className="text-xs text-gray-500">Administrateur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}>
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name.toLowerCase().replace(' ', ''))
                      setSidebarOpen(false)
                    }}
                    className={`${
                      item.current
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group w-full flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-200`}
                  >
                    <item.icon
                      className={`${
                        item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Sidebar footer */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Qencorroe</p>
                  <p className="text-xs text-gray-500">Version 2.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:pl-0">
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'products' && <ProductManager />}
              {activeTab === 'orders' && <OrderManager />}
              {activeTab === 'customers' && <CustomerManager />}
              {activeTab === 'pages' && <PageManager />}
              {activeTab === 'media' && <MediaManager />}
              {activeTab === 'analytics' && <Analytics />}
              {activeTab === 'social' && <SocialMediaManager />}
              {activeTab === 'settings' && <SettingsManager />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}