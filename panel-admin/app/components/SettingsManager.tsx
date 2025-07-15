'use client'

import { useState, useEffect } from 'react'
import { CogIcon, EyeIcon } from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  footerText: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    favicon: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    footerText: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    const response = await apiClient.getSettings()
    if (response.success && response.data) {
      setSettings(response.data as SiteSettings)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const settingsData: SiteSettings = {
      siteName: formData.get('siteName') as string,
      siteDescription: formData.get('siteDescription') as string,
      logo: formData.get('logo') as string,
      favicon: formData.get('favicon') as string,
      primaryColor: formData.get('primaryColor') as string,
      secondaryColor: formData.get('secondaryColor') as string,
      footerText: formData.get('footerText') as string,
      seoTitle: formData.get('seoTitle') as string,
      seoDescription: formData.get('seoDescription') as string,
      seoKeywords: formData.get('seoKeywords') as string
    }

    const response = await apiClient.updateSettings(settingsData)
    if (response.success) {
      setSettings(settingsData)
      alert('Paramètres mis à jour avec succès !')
    }
    
    setSaving(false)
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
        <h2 className="text-2xl font-bold text-gray-900">Paramètres du Site</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de paramètres */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du site
              </label>
              <input
                type="text"
                name="siteName"
                defaultValue={settings.siteName}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description du site
              </label>
              <textarea
                name="siteDescription"
                defaultValue={settings.siteDescription}
                className="input-field"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du logo
                </label>
                <input
                  type="url"
                  name="logo"
                  defaultValue={settings.logo}
                  className="input-field"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du favicon
                </label>
                <input
                  type="url"
                  name="favicon"
                  defaultValue={settings.favicon}
                  className="input-field"
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur primaire
                </label>
                <input
                  type="color"
                  name="primaryColor"
                  defaultValue={settings.primaryColor}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur secondaire
                </label>
                <input
                  type="color"
                  name="secondaryColor"
                  defaultValue={settings.secondaryColor}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte du footer
              </label>
              <input
                type="text"
                name="footerText"
                defaultValue={settings.footerText}
                className="input-field"
                placeholder="© 2024 Votre Site. Tous droits réservés."
              />
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">SEO</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre SEO
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    defaultValue={settings.seoTitle}
                    className="input-field"
                    placeholder="Titre de votre site - Description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description SEO
                  </label>
                  <textarea
                    name="seoDescription"
                    defaultValue={settings.seoDescription}
                    className="input-field"
                    rows={3}
                    placeholder="Description de votre site pour les moteurs de recherche"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mots-clés SEO
                  </label>
                  <input
                    type="text"
                    name="seoKeywords"
                    defaultValue={settings.seoKeywords}
                    className="input-field"
                    placeholder="mot-clé1, mot-clé2, mot-clé3"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button 
                type="submit" 
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </form>
        </div>

        {/* Aperçu */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Informations du site</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Nom :</strong> {settings.siteName || 'Non défini'}</p>
                <p><strong>Description :</strong> {settings.siteDescription || 'Non définie'}</p>
                {settings.logo && (
                  <div>
                    <p><strong>Logo :</strong></p>
                    <img src={settings.logo} alt="Logo" className="h-12 object-contain" />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Couleurs</h4>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>
                  <span className="text-sm">Primaire</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: settings.secondaryColor }}
                  ></div>
                  <span className="text-sm">Secondaire</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">SEO</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Titre :</strong> {settings.seoTitle || 'Non défini'}</p>
                <p><strong>Description :</strong> {settings.seoDescription || 'Non définie'}</p>
                <p><strong>Mots-clés :</strong> {settings.seoKeywords || 'Non définis'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Instructions</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Le nom du site sera affiché dans le titre de la page et le header</p>
          <p>• Les couleurs seront appliquées à l'interface de votre boutique</p>
          <p>• Les informations SEO sont importantes pour le référencement</p>
          <p>• Assurez-vous que les URLs des images sont accessibles</p>
        </div>
      </div>
    </div>
  )
}