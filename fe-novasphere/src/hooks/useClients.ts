import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Client } from '@/types/client'
import apiClient from '@/api/apiClient'

export const useClients = (filters?: { search?: string; status?: string }) => {
  const queryClient = useQueryClient()

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ['clients', filters],
    queryFn: async () => {
      const { data } = await apiClient.get('/clients', { params: filters })
      return data
    }
  })

  const createClient = useMutation<Client, Error, Partial<Client>>({
    mutationFn: async (newClient) => {
      const { data } = await apiClient.post('/clients', newClient)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  const updateClient = useMutation<Client, Error, { id: string; data: Partial<Client> }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/clients/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })

  return {
    clients,
    isLoading,
    createClient,
    updateClient
  }
} 