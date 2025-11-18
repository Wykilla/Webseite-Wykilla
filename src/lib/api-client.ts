/**
 * API Client für Hybrid Deployment
 * 
 * Wenn NEXT_PUBLIC_API_URL gesetzt ist, werden alle API Calls
 * an die externe Backend-URL weitergeleitet.
 * 
 * Beispiel:
 * - Frontend: https://wykilla.com (HostEurope)
 * - Backend: https://wykilla-api.vercel.app (Vercel)
 * 
 * Alle `/api/*` Calls werden automatisch zu `https://wykilla-api.vercel.app/api/*` umgeleitet
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

/**
 * Konvertiert relative API-URLs zu absoluten URLs (falls Backend extern)
 */
export function getApiUrl(endpoint: string): string {
  // Entferne führenden Slash falls vorhanden
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  
  // Wenn NEXT_PUBLIC_API_URL gesetzt ist, nutze externe Backend-URL
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanEndpoint}`
  }
  
  // Sonst relative URL (für lokale Entwicklung)
  return `/${cleanEndpoint}`
}

/**
 * Wrapper für fetch, der automatisch die richtige API-URL verwendet
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(endpoint)
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `API Error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * GET Request
 */
export async function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'GET' })
}

/**
 * POST Request
 */
export async function apiPost<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * PUT Request
 */
export async function apiPut<T = any>(
  endpoint: string,
  data?: any
): Promise<T> {
  return apiFetch<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

/**
 * DELETE Request
 */
export async function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiFetch<T>(endpoint, { method: 'DELETE' })
}

