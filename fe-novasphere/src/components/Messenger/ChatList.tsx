import { ChatRoom } from '@/types/message'
import { format } from 'date-fns'

interface ChatListProps {
    chatRooms: ChatRoom[]
    selectedChatId: string | null
    onSelectChat: (chatId: string) => void
}

export const ChatList = ({ chatRooms, selectedChatId, onSelectChat }: ChatListProps) => {
    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Buscar conversas..."
                    className="input-field bg-[#1C1C1C] text-white placeholder:text-white border-white"
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {chatRooms.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-primary-50' : ''
                            }`}
                    >
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {chat.participants.join(', ')}
                                </p>
                                {chat.lastMessage && (
                                    <p className="text-xs text-gray-500">
                                        {format(new Date(chat.lastMessage.createdAt), 'HH:mm')}
                                    </p>
                                )}
                            </div>
                            {chat.lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                    {chat.lastMessage.content}
                                </p>
                            )}
                            {chat.unreadCount > 0 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                    {chat.unreadCount}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
} 