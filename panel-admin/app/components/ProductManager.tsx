'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  VideoCameraIcon,
  TagIcon
} from '@heroicons/react/24/outline'
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
  specifications?: Record<string, any>
  rating?: number
  sales?: number
}

export default function ProductManager() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
    try {
      const response = await apiClient.getProducts()
      if (response.success && response.data) {
        setProductsList(response.data as Product[])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
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

    try {
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
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
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
      try {
        const response = await apiClient.deleteProduct(id)
        if (response.success) {
          loadProducts()
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
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

  // Mock data pour la démo
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'T-shirt Premium',
      price: 29.99,
      description: 'T-shirt en coton bio de haute qualité',
      longDescription: 'Un t-shirt confortable et durable, parfait pour tous les jours. Fabriqué en coton bio de haute qualité.',
      category: 'Vêtements',
      stock: 50,
      images: ['/uploads/product-1-1.jpg'],
      video: '/uploads/product-1-video.mp4',
      features: ['Coton bio', 'Confortable', 'Durable'],
      specifications: { material: '100% Coton bio', weight: '180g/m²' },
      rating: 4.5,
      sales: 125
    },
    {
      id: '2',
      name: 'Casque Audio Pro',
      price: 89.99,
      description: 'Casque audio sans fil avec réduction de bruit',
      category: 'Électronique',
      stock: 25,
      images: ['/uploads/product-2-1.jpg'],
      rating: 4.8,
      sales: 89
    }
  ]

  const products = mockProducts

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Product]
    let bValue: any = b[sortBy as keyof Product]
    
    if (sortBy === 'name') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">{products.length} produits au total</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un produit
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Vêtements">Vêtements</option>
            <option value="Électronique">Électronique</option>
            <option value="Accessoires">Accessoires</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Nom</option>
            <option value="price">Prix</option>
            <option value="stock">Stock</option>
            <option value="sales">Ventes</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Video indicator */}
              {product.video && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                  <VideoCameraIcon className="h-4 w-4 text-white" />
                </div>
              )}
              
              {/* Stock indicator */}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock < 10 
                    ? 'bg-red-100 text-red-800' 
                    : product.stock < 50 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {product.stock} en stock
                </span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  {product.rating && (
                    <>
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(product.price)}
                </span>
                <div className="flex items-center space-x-2">
                  <TagIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <ShoppingBagIcon className="h-4 w-4 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="text-lg font-semibold text-gray-900">{product.stock}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Ventes</p>
                      <p className="text-lg font-semibold text-gray-900">{product.sales || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 btn-secondary flex items-center justify-center text-sm"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Voir
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 btn-secondary flex items-center justify-center text-sm"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
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
                    Nom du produit *
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
                    Prix *
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Électronique">Électronique</option>
                    <option value="Accessoires">Accessoires</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description courte *
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description longue
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="input-field"
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL vidéo
                  </label>
                  <input
                    type="url"
                    value={formData.video}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    className="input-field"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URLs des images (séparées par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.images.join(', ')}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(url => url.trim()) })}
                    className="input-field"
                    placeholder="https://..., https://..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
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
        </div>
      )}
    </div>
  )
}