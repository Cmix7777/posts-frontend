export const useApi = () => {
  const config = useRuntimeConfig()
  
  const baseFetch = async (url: string, options?: any) => {
    return await $fetch(url, {
      baseURL: config.public.apiBase,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    })
  }
  
  return {
    get: (url: string, params?: any) => baseFetch(url, { method: 'GET', params }),
    post: (url: string, body: any) => baseFetch(url, { method: 'POST', body }),
    put: (url: string, body: any) => baseFetch(url, { method: 'PUT', body }),
    delete: (url: string) => baseFetch(url, { method: 'DELETE' })
  }
}