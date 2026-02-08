export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

interface ApiRequestOptions extends RequestInit {
  data?: unknown
}

interface ApiErrorResponse {
  message?: string
}

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again."

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { data, headers, ...rest } = options
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : rest.body,
  })

  if (!response.ok) {
    let errorMessage = DEFAULT_ERROR_MESSAGE

    try {
      const errorBody = (await response.json()) as ApiErrorResponse
      if (errorBody.message) {
        errorMessage = errorBody.message
      }
    } catch (error) {
      console.error("Failed to parse error response", error)
    }

    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return {} as T
  }

  return (await response.json()) as T
}
