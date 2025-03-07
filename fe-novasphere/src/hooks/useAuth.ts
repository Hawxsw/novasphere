import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, LoginCredentials, AuthResponse } from '@/types/auth'
import apiClient from '@/api/apiClient'

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  })

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setState({ isAuthenticated: false, isLoading: false, user: null });
          return;
        }

        // Aqui você deve validar o token com sua API
        // const response = await validateToken(token);
        // setState({ isAuthenticated: true, isLoading: false, user: response.user });

      } catch (error) {
        setState({ isAuthenticated: false, isLoading: false, user: null });
      }
    };

    checkAuth();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  }
} 