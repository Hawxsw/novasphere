import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Message, ChatRoom } from '@/types/message'
import apiClient from '@/api/apiClient'

export const useMessages = (userId?: string) => {
  const queryClient = useQueryClient()

  const { data: chatRooms } = useQuery<ChatRoom[]>({
    queryKey: ['chat-rooms', userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/messenger/groups/${userId}`)
      return data
    },
    enabled: !!userId
  })

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['messages', userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/messenger/messages/${userId}`)
      return data
    },
    enabled: !!userId
  })

  const sendMessage = useMutation<Message, Error, { content: string; receiverId: string }>({
    mutationFn: async (message) => {
      const { data } = await apiClient.post('/messenger/message', message)
      return data
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(['messages', userId], (old = []) => [...old, newMessage])
    }
  })

  return {
    chatRooms,
    messages,
    isLoading,
    sendMessage
  }
} 