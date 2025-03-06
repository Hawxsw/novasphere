import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Message, ChatRoom } from '@/types/message'
import apiClient from '@/api/apiClient'

export const useMessages = (chatRoomId?: string) => {
  const queryClient = useQueryClient()

  const { data: chatRooms } = useQuery<ChatRoom[]>({
    queryKey: ['chat-rooms'],
    queryFn: async () => {
      const { data } = await apiClient.get('/chat-rooms')
      return data
    }
  })

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['messages', chatRoomId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/chat-rooms/${chatRoomId}/messages`)
      return data
    },
    enabled: !!chatRoomId
  })

  const sendMessage = useMutation<Message, Error, { content: string; receiverId: string }>({
    mutationFn: async (message) => {
      const { data } = await apiClient.post('/messages', message)
      return data
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(['messages', chatRoomId], (old = []) => [...old, newMessage])
    }
  })

  return {
    chatRooms,
    messages,
    isLoading,
    sendMessage
  }
} 