'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface Product {
  id: string
  name: string
  price: number
  description: string
  longDescription?: string
  category: string
  stock: number
  images?: string[]
  video?: string
  features?: string[]
  specifications?: any
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    longDescription: '',
    category: '',
    stock: '',
    images: [] as string[],
    video: '',
    features: [] as string[],
    specifications: {}
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    const response = await apiClient.getProducts()
    if (response.success && response.data) {
      setProducts(response.data as Product[])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      longDescription: formData.longDescription,
      category: formData.category,
      stock: parseInt(formData.stock),
      images: formData.images,
      video: formData.video,
      features: formData.features,
      specifications: formData.specifications
    }

    if (editingProduct) {
      const response = await apiClient.updateProduct(editingProduct.id, productData)
      if (response.success) {
        setShowForm(false)
        setEditingProduct(null)
        resetForm()
        loadProducts()
      }
    } else {
      const response = await apiClient.createProduct(productData)
      if (response.success) {
        setShowForm(false)
        resetForm()
        loadProducts()
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      longDescription: product.longDescription || '',
      category: product.category,
      stock: product.stock.toString(),
      images: product.images || [],
      video: product.video || '',
      features: product.features || [],
      specifications: product.specifications || {}
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const response = await apiClient.deleteProduct(id)
      if (response.success) {
        loadProducts()
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      longDescription: '',
      category: '',
      stock: '',
      images: [],
      video: '',
      features: [],
      specifications: {}
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l'image
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Modifier' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                  resetForm()
                }}
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-blue-600">€{product.price}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  )
}