'use client'

import { useState, useEffect } from 'react'
import { EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
  updatedAt: string
}

const statusColors = {
  'En attente': 'bg-yellow-100 text-yellow-800',
  'En cours': 'bg-blue-100 text-blue-800',
  'Livré': 'bg-green-100 text-green-800',
  'Annulé': 'bg-red-100 text-red-800'
}

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    const response = await apiClient.getOrders()
    if (response.success && response.data) {
      setOrders(response.data as Order[])
    }
    setLoading(false)
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const response = await apiClient.updateOrderStatus(orderId, newStatus)
    if (response.success) {
      loadOrders()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h2>
        <div className="text-sm text-gray-500">
          {orders.length} commande(s) au total
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Commande #{order.id}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-primary-600">€{order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Articles :</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="btn-secondary flex items-center"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Détails
                </button>
                
                {order.status === 'En attente' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateOrderStatus(order.id, 'En cours')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Accepter
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Annulé')}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      Refuser
                    </button>
                  </div>
                )}
                
                {order.status === 'En cours' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'Livré')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center"
                  >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Livré
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune commande trouvée</p>
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Détails de la commande #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Informations client</h4>
                <p><strong>Nom :</strong> {selectedOrder.customerName}</p>
                <p><strong>Email :</strong> {selectedOrder.customerEmail}</p>
                <p><strong>ID Client :</strong> {selectedOrder.customerId}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Articles commandés</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Total: €{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total de la commande</span>
                  <span className="text-2xl font-bold text-primary-600">€{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Statut et dates</h4>
                <p><strong>Statut actuel :</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                    {selectedOrder.status}
                  </span>
                </p>
                <p><strong>Date de création :</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Dernière mise à jour :</strong> {formatDate(selectedOrder.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}