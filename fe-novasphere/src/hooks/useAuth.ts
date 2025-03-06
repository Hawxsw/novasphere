import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, LoginCredentials, AuthResponse } from '@/types/auth'
import apiClient from '@/api/apiClient'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await apiClient.get('/auth/me')
      return data
    },
    retry: false
  })

  const login = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const { data } = await apiClient.post('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      queryClient.setQueryData(['user'], data.user)
    }
  })

  const logout = () => {
    localStorage.removeItem('token')
    queryClient.clear()
    window.location.href = '/login'
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  }
} 