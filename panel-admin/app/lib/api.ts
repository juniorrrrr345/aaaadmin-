const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://qencorroezzz.vercel.app/api'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE_URL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  // Pages
  async getPages() {
    return this.request('/pages')
  }

  async getPage(id: string) {
    return this.request(`/pages/${id}`)
  }

  async updatePage(id: string, pageData: any) {
    return this.request(`/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData),
    })
  }

  // Produits
  async getProducts() {
    return this.request('/products')
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    })
  }

  // Upload de fichiers
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Laisser le navigateur définir le Content-Type pour FormData
    })
  }

  // Réseaux sociaux
  async getSocialMedia() {
    return this.request('/social-media')
  }

  async updateSocialMedia(socialData: any) {
    return this.request('/social-media', {
      method: 'PUT',
      body: JSON.stringify(socialData),
    })
  }

  // Paramètres du site
  async getSettings() {
    return this.request('/settings')
  }

  async updateSettings(settingsData: any) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    })
  }
}

export const apiClient = new ApiClient()