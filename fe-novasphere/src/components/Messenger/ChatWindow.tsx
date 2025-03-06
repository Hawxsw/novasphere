import { useState, useRef, useEffect } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { Message } from '@/types/message'
import { useAuth } from '@/hooks/useAuth'
import { format } from 'date-fns'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface ChatWindowProps {
    chatRoomId: string
}

export const ChatWindow = ({ chatRoomId }: ChatWindowProps) => {
    const [newMessage, setNewMessage] = useState('')
    const { messages, sendMessage } = useMessages(chatRoomId)
    const { user } = useAuth()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        sendMessage.mutate({
            content: newMessage,
            receiverId: chatRoomId
        }, {
            onSuccess: () => setNewMessage('')
        })
    }

    const renderMessage = (message: Message) => {
        const isSender = message.senderId === user?.id
        return (
            <div
                key={message.id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div className={`max-w-[70%] rounded-lg p-3 ${isSender
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}
                >
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 ${isSender ? 'text-primary-100' : 'text-gray-500'}`}>
                        {format(new Date(message.createdAt), 'HH:mm')}
                        {message.read && isSender && (
                            <span className="ml-2">✓✓</span>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-lg font-medium text-gray-900">Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map(renderMessage)}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="input-field"
                    />
                    <button
                        type="submit"
                        disabled={sendMessage.isPending}
                        className="btn-primary p-2"
                    >
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    )
} 