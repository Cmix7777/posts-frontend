export const useApi = () => {
  const config = useRuntimeConfig()
  
  const baseFetch = async (url: string, options?: any) => {
    try {
      return await $fetch(url, {
        baseURL: config.public.apiBase,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      })
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
  
  return {
    get: (url: string) => baseFetch(url),
    post: (url: string, body: any) => baseFetch(url, { method: 'POST', body }),
    put: (url: string, body: any) => baseFetch(url, { method: 'PUT', body }),
    delete: (url: string) => baseFetch(url, { method: 'DELETE' })
  }
}