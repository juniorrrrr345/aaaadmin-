'use client'

import { useState, useEffect } from 'react'
import { PencilIcon, EyeIcon } from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface Page {
  id: string
  title: string
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroImage?: string
  content?: string
  image?: string
  address?: string
  phone?: string
  email?: string
  hours?: string
  sections?: any[]
}

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    setLoading(true)
    const response = await apiClient.getPages()
    if (response.success && response.data) {
      setPages(response.data as Page[])
    }
    setLoading(false)
  }

  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPage) return

    const formData = new FormData(e.target as HTMLFormElement)
    const pageData: any = {}
    
    for (const [key, value] of formData.entries()) {
      pageData[key] = value
    }

    const response = await apiClient.updatePage(editingPage.id, pageData)
    if (response.success) {
      setShowForm(false)
      setEditingPage(null)
      loadPages()
    }
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
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Pages</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div key={page.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-500">Page #{page.id}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(page)}
                  className="btn-secondary flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Modifier
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {page.heroTitle && (
                <div>
                  <p className="text-sm text-gray-500">Titre principal</p>
                  <p className="text-sm font-medium truncate">{page.heroTitle}</p>
                </div>
              )}
              
              {page.content && (
                <div>
                  <p className="text-sm text-gray-500">Contenu</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{page.content}</p>
                </div>
              )}

              {page.address && (
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="text-sm text-gray-600">{page.address}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de modification */}
      {showForm && editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Modifier la page {editingPage.title}</h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingPage(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {editingPage.id === 'home' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre principal
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      defaultValue={editingPage.heroTitle}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sous-titre
                    </label>
                    <input
                      type="text"
                      name="heroSubtitle"
                      defaultValue={editingPage.heroSubtitle}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="heroDescription"
                      defaultValue={editingPage.heroDescription}
                      className="input-field"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {editingPage.id === 'about' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu de la page
                  </label>
                  <textarea
                    name="content"
                    defaultValue={editingPage.content}
                    className="input-field"
                    rows={8}
                  />
                </div>
              )}

              {editingPage.id === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={editingPage.address}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={editingPage.phone}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingPage.email}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horaires
                    </label>
                    <input
                      type="text"
                      name="hours"
                      defaultValue={editingPage.hours}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary">
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingPage(null)
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