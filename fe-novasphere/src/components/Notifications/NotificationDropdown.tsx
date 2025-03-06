import { useNotifications } from '@/hooks/useNotifications'
import { format } from 'date-fns'
import { BellIcon } from '@heroicons/react/24/outline'

export const NotificationDropdown = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

    return (
        <div className="relative">
            <button
                type="button"
                className="relative p-2 text-gray-400 hover:text-gray-500"
            >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
            </button>

            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markAllAsRead()}
                                className="text-sm text-primary-600 hover:text-primary-700"
                            >
                                Marcar todas como lidas
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {notifications?.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-primary-50' : ''}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                    {notification.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {format(new Date(notification.createdAt), 'HH:mm')}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {notification.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 