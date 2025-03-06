import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/api/apiClient'

interface Notification {
    id: string
    type: 'message' | 'interaction'
    title: string
    message: string
    read: boolean
    createdAt: string
}

export const useNotifications = () => {
    const queryClient = useQueryClient()

    const { data: notifications } = useQuery<Notification[]>({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data } = await apiClient.get('/notifications')
            return data
        },
        refetchInterval: 30000 // Atualiza a cada 30 segundos
    })

    const markAsRead = async (notificationId: string) => {
        await apiClient.put(`/notifications/${notificationId}/read`)
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }

    const markAllAsRead = async () => {
        await apiClient.put('/notifications/read-all')
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
    }

    // Adiciona notificações do navegador quando receber novas mensagens
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission()
        }

        const unreadNotifications = notifications?.filter(n => !n.read) || []
        unreadNotifications.forEach(notification => {
            if (Notification.permission === 'granted') {
                new Notification(notification.title, {
                    body: notification.message,
                    icon: '/logo.png'
                })
            }
        })
    }, [notifications])

    return {
        notifications,
        unreadCount: notifications?.filter(n => !n.read).length || 0,
        markAsRead,
        markAllAsRead
    }
} 