'use client'

import { useState, useEffect } from 'react'
import { 
  ShareIcon, 
  EyeIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface SocialMedia {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
  snapchat?: string
}

const socialPlatforms = [
  { key: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
  { key: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-600' },
  { key: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
  { key: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
  { key: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-600' },
  { key: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black' },
  { key: 'snapchat', name: 'Snapchat', icon: '👻', color: 'bg-yellow-400' }
]

export default function SocialMediaManager() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSocialMedia()
  }, [])

  const loadSocialMedia = async () => {
    setLoading(true)
    const response = await apiClient.getSocialMedia()
    if (response.success && response.data) {
      setSocialMedia(response.data as SocialMedia)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const socialData: SocialMedia = {}
    
    for (const [key, value] of formData.entries()) {
      if (value) {
        socialData[key as keyof SocialMedia] = value as string
      }
    }

    const response = await apiClient.updateSocialMedia(socialData)
    if (response.success) {
      setSocialMedia(socialData)
      alert('Réseaux sociaux mis à jour avec succès !')
    }
    
    setSaving(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('URL copiée dans le presse-papiers !')
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
        <h2 className="text-2xl font-bold text-gray-900">Réseaux Sociaux</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de modification */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Modifier les liens</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="mr-2">{platform.icon}</span>
                  {platform.name}
                </label>
                <input
                  type="url"
                  name={platform.key}
                  defaultValue={socialMedia[platform.key as keyof SocialMedia] || ''}
                  placeholder={`https://${platform.key}.com/votre-compte`}
                  className="input-field"
                />
              </div>
            ))}
            
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

        {/* Aperçu des réseaux sociaux */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
          
          <div className="space-y-3">
            {socialPlatforms.map((platform) => {
              const url = socialMedia[platform.key as keyof SocialMedia]
              return (
                <div key={platform.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${platform.color}`}>
                      <span className="text-sm">{platform.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      {url ? (
                        <p className="text-sm text-gray-600 truncate max-w-xs">{url}</p>
                      ) : (
                        <p className="text-sm text-gray-400">Non configuré</p>
                      )}
                    </div>
                  </div>
                  
                  {url && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="btn-secondary text-xs flex items-center"
                      >
                        <LinkIcon className="h-3 w-3 mr-1" />
                        Copier
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs flex items-center"
                      >
                        <EyeIcon className="h-3 w-3 mr-1" />
                        Voir
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Instructions</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Ajoutez les URLs complètes de vos réseaux sociaux (ex: https://facebook.com/votre-page)</p>
          <p>• Les liens seront affichés sur votre boutique</p>
          <p>• Vous pouvez laisser vide les réseaux que vous n'utilisez pas</p>
          <p>• Cliquez sur "Copier" pour copier l'URL dans le presse-papiers</p>
        </div>
      </div>
    </div>
  )
}