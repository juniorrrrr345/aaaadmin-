const API_BASE_URL = process.env.NEXT_PUBLIC_BOUTIQUE_API_URL || 'http://localhost:3000/api'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }
    }
  }

  // Dashboard & Analytics
  async getStats(): Promise<ApiResponse> {
    return this.request('/stats')
  }

  async getAnalytics(period: string = '30d'): Promise<ApiResponse> {
    return this.request(`/analytics?period=${period}`)
  }

  // Products
  async getProducts(): Promise<ApiResponse> {
    return this.request('/products')
  }

  async getProduct(id: string): Promise<ApiResponse> {
    return this.request(`/products/${id}`)
  }

  async createProduct(productData: any): Promise<ApiResponse> {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(id: string, productData: any): Promise<ApiResponse> {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  }

  async deleteProduct(id: string): Promise<ApiResponse> {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    })
  }

  // Orders
  async getOrders(): Promise<ApiResponse> {
    return this.request('/orders')
  }

  async getOrder(id: string): Promise<ApiResponse> {
    return this.request(`/orders/${id}`)
  }

  async createOrder(orderData: any): Promise<ApiResponse> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  async updateOrder(id: string, orderData: any): Promise<ApiResponse> {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    })
  }

  async deleteOrder(id: string): Promise<ApiResponse> {
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    })
  }

  // Customers
  async getCustomers(): Promise<ApiResponse> {
    return this.request('/customers')
  }

  async getCustomer(id: string): Promise<ApiResponse> {
    return this.request(`/customers/${id}`)
  }

  async createCustomer(customerData: any): Promise<ApiResponse> {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    })
  }

  async updateCustomer(id: string, customerData: any): Promise<ApiResponse> {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customerData),
    })
  }

  async deleteCustomer(id: string): Promise<ApiResponse> {
    return this.request(`/customers/${id}`, {
      method: 'DELETE',
    })
  }

  // Pages
  async getPages(): Promise<ApiResponse> {
    return this.request('/pages')
  }

  async getPage(id: string): Promise<ApiResponse> {
    return this.request(`/pages/${id}`)
  }

  async createPage(pageData: any): Promise<ApiResponse> {
    return this.request('/pages', {
      method: 'POST',
      body: JSON.stringify(pageData),
    })
  }

  async updatePage(id: string, pageData: any): Promise<ApiResponse> {
    return this.request(`/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData),
    })
  }

  async deletePage(id: string): Promise<ApiResponse> {
    return this.request(`/pages/${id}`, {
      method: 'DELETE',
    })
  }

  // Media
  async getMedia(): Promise<ApiResponse> {
    return this.request('/media')
  }

  async uploadMedia(file: File): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('file', file)

    return this.request('/media/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
      },
      body: formData,
    })
  }

  async deleteMedia(id: string): Promise<ApiResponse> {
    return this.request(`/media/${id}`, {
      method: 'DELETE',
    })
  }

  // Social Media
  async getSocialMedia(): Promise<ApiResponse> {
    return this.request('/social-media')
  }

  async updateSocialMedia(socialData: any): Promise<ApiResponse> {
    return this.request('/social-media', {
      method: 'PUT',
      body: JSON.stringify(socialData),
    })
  }

  // Settings
  async getSettings(): Promise<ApiResponse> {
    return this.request('/settings')
  }

  async updateSettings(settingsData: any): Promise<ApiResponse> {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    })
  }

  // File upload helper
  async uploadFile(file: File, type: 'image' | 'video' | 'document' = 'image'): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    return this.request('/upload', {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it with boundary
      },
      body: formData,
    })
  }

  // Search
  async search(query: string, type: 'products' | 'orders' | 'customers' = 'products'): Promise<ApiResponse> {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`)
  }

  // Export data
  async exportData(type: 'products' | 'orders' | 'customers', format: 'csv' | 'json' = 'csv'): Promise<ApiResponse> {
    return this.request(`/export/${type}?format=${format}`)
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health')
  }
}

export const apiClient = new ApiClient(API_BASE_URL)