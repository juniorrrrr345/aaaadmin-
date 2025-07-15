'use client'

import { useState } from 'react'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  PhotoIcon,
  CogIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import PageManager from './components/PageManager'
import ProductManager from './components/ProductManager'
import MediaManager from './components/MediaManager'
import SettingsManager from './components/SettingsManager'
import SocialMediaManager from './components/SocialMediaManager'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pages')

  const navigation = [
    { name: 'Pages', href: '#', icon: HomeIcon, current: activeTab === 'pages' },
    { name: 'Produits', href: '#', icon: ShoppingBagIcon, current: activeTab === 'products' },
    { name: 'Médias', href: '#', icon: PhotoIcon, current: activeTab === 'media' },
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
              <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
              <span className="ml-2 text-sm text-gray-500">Qencorroe</span>
            </div>
            <div className="flex items-center space-x-4">
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
                  onClick={() => setActiveTab(item.name.toLowerCase().replace(' ', ''))}
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
            {activeTab === 'pages' && (
              <div>
                <PageManager />
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <ProductManager />
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <MediaManager />
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <SocialMediaManager />
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <SettingsManager />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}