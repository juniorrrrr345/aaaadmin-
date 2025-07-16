'use client'

import { useState, useEffect } from 'react'
import { 
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  totalOrders: number
  totalSpent: number
  lastOrder?: string
  createdAt: string
  status: 'active' | 'inactive'
}

export default function CustomerManager() {
  const [customersList, setCustomersList] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  })

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getCustomers()
      if (response.success && response.data) {
        setCustomersList(response.data as Customer[])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const customerData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country
    }

    try {
      if (editingCustomer) {
        const response = await apiClient.updateCustomer(editingCustomer.id, customerData)
        if (response.success) {
          setShowForm(false)
          setEditingCustomer(null)
          resetForm()
          loadCustomers()
        }
      } else {
        const response = await apiClient.createCustomer(customerData)
        if (response.success) {
          setShowForm(false)
          resetForm()
          loadCustomers()
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      country: customer.country || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        const response = await apiClient.deleteCustomer(id)
        if (response.success) {
          loadCustomers()
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: ''
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Mock data
  const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      address: '123 Rue de la Paix',
      city: 'Paris',
      country: 'France',
      totalOrders: 5,
      totalSpent: 450.75,
      lastOrder: new Date().toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      status: 'active'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 98 76 54 32',
      address: '456 Avenue des Champs',
      city: 'Lyon',
      country: 'France',
      totalOrders: 3,
      totalSpent: 289.50,
      lastOrder: new Date(Date.now() - 86400000 * 7).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
      status: 'active'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      phone: '+33 6 11 22 33 44',
      address: '789 Boulevard Central',
      city: 'Marseille',
      country: 'France',
      totalOrders: 1,
      totalSpent: 89.99,
      lastOrder: new Date(Date.now() - 86400000 * 15).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
      status: 'inactive'
    }
  ]

  const customers = mockCustomers

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600">{customers.length} clients au total</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un client
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Customer Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customer.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            {/* Customer Info */}
            <div className="space-y-3 mb-4">
              {customer.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {customer.phone}
                </div>
              )}
              {customer.address && (
                <div className="flex items-start text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p>{customer.address}</p>
                    <p>{customer.city}, {customer.country}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <ShoppingBagIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Commandes</p>
                    <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Total dépensé</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Last Order */}
            {customer.lastOrder && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Dernière commande: {formatDate(customer.lastOrder)}
              </div>
            )}
            
            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="flex-1 btn-secondary flex items-center justify-center text-sm"
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                Voir
              </button>
              <button
                onClick={() => handleEdit(customer)}
                className="flex-1 btn-secondary flex items-center justify-center text-sm"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingCustomer ? 'Modifier le client' : 'Ajouter un client'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingCustomer(null)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary">
                  {editingCustomer ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingCustomer(null)
                    resetForm()
                  }}
                  className="btn-secondary"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Détails du client</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedCustomer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCustomer.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Informations de contact</h5>
                  <div className="space-y-2">
                    {selectedCustomer.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                    )}
                    {selectedCustomer.address && (
                      <div className="flex items-start">
                        <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p>{selectedCustomer.address}</p>
                          <p>{selectedCustomer.city}, {selectedCustomer.country}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Statistiques</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total commandes:</span>
                      <span className="font-semibold">{selectedCustomer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total dépensé:</span>
                      <span className="font-semibold">{formatCurrency(selectedCustomer.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client depuis:</span>
                      <span className="font-semibold">{formatDate(selectedCustomer.createdAt)}</span>
                    </div>
                    {selectedCustomer.lastOrder && (
                      <div className="flex justify-between">
                        <span>Dernière commande:</span>
                        <span className="font-semibold">{formatDate(selectedCustomer.lastOrder)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}