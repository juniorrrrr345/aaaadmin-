'use client'

import { useState, useRef } from 'react'
import { PhotoIcon, VideoCameraIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { apiClient } from '../lib/api'

interface UploadedFile {
  fileUrl: string
  filename: string
  originalName: string
  size: number
}

export default function MediaManager() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      uploadFiles(Array.from(files))
    }
  }

  const uploadFiles = async (files: File[]) => {
    setUploading(true)
    
    for (const file of files) {
      try {
        const response = await apiClient.uploadFile(file)
        if (response.success && response.data) {
          setUploadedFiles(prev => [...prev, response.data])
        }
      } catch (error) {
        console.error('Erreur lors de l\'upload:', error)
      }
    }
    
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    uploadFiles(files)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const deleteFile = (filename: string) => {
    setUploadedFiles(prev => prev.filter(file => file.filename !== filename))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) return 'image'
    if (['mp4', 'mov', 'avi', 'webm'].includes(ext || '')) return 'video'
    return 'other'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Médias</h2>
      </div>

      {/* Zone d'upload */}
      <div className="card mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ajouter des médias</h3>
        
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Formats supportés : JPG, PNG, GIF, MP4, MOV, AVI, WEBM (max 10MB)
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary"
          >
            {uploading ? 'Upload en cours...' : 'Sélectionner des fichiers'}
          </button>
        </div>
      </div>

      {/* Liste des fichiers uploadés */}
      {uploadedFiles.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Fichiers uploadés</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.filename} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getFileType(file.filename) === 'image' ? (
                      <PhotoIcon className="h-5 w-5 text-blue-500" />
                    ) : getFileType(file.filename) === 'video' ? (
                      <VideoCameraIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <PhotoIcon className="h-5 w-5 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {file.originalName}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteFile(file.filename)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    Taille: {formatFileSize(file.size)}
                  </p>
                  
                  {getFileType(file.filename) === 'image' && (
                    <img
                      src={file.fileUrl}
                      alt={file.originalName}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  
                  {getFileType(file.filename) === 'video' && (
                    <video
                      src={file.fileUrl}
                      className="w-full h-32 object-cover rounded"
                      controls
                    />
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="btn-secondary text-xs flex items-center"
                    >
                      <EyeIcon className="h-3 w-3 mr-1" />
                      Voir
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(file.fileUrl)}
                      className="btn-secondary text-xs"
                    >
                      Copier URL
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de visualisation */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedFile.originalName}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {getFileType(selectedFile.filename) === 'image' && (
                <img
                  src={selectedFile.fileUrl}
                  alt={selectedFile.originalName}
                  className="w-full max-h-96 object-contain rounded"
                />
              )}
              
              {getFileType(selectedFile.filename) === 'video' && (
                <video
                  src={selectedFile.fileUrl}
                  className="w-full max-h-96 rounded"
                  controls
                  autoPlay
                />
              )}
              
              <div className="space-y-2">
                <p><strong>Nom original :</strong> {selectedFile.originalName}</p>
                <p><strong>Taille :</strong> {formatFileSize(selectedFile.size)}</p>
                <p><strong>URL :</strong> 
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm ml-2">
                    {selectedFile.fileUrl}
                  </code>
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => navigator.clipboard.writeText(selectedFile.fileUrl)}
                  className="btn-primary"
                >
                  Copier URL
                </button>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="btn-secondary"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}