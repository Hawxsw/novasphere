import { useQuery } from '@tanstack/react-query'
import { Client, ClientInteraction } from '@/types/client'
import apiClient from '@/api/apiClient'

export const useClientDetails = (clientId: string) => {
  const { data: client, isLoading: isLoadingClient } = useQuery<Client>({
    queryKey: ['client', clientId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/clients/${clientId}`)
      return data
    },
    enabled: !!clientId
  })

  const { data: interactions, isLoading: isLoadingInteractions } = useQuery<ClientInteraction[]>({
    queryKey: ['client-interactions', clientId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/clients/${clientId}/interactions`)
      return data
    },
    enabled: !!clientId
  })

  return {
    client,
    interactions,
    isLoading: isLoadingClient || isLoadingInteractions
  }
} 