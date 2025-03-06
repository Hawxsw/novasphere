import { useState } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { ChatWindow } from '@/components/Messenger/ChatWindow'
import { ChatList } from '@/components/Messenger/ChatList'

export const Messenger = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const { chatRooms } = useMessages()

    return (
        <div className="h-[calc(100vh-7rem)]">
            <div className="flex h-full ">
                <div className="w-80 border-r border-gray-200 bg-[#1C1C1C]">
                    <ChatList
                        chatRooms={chatRooms || []}
                        selectedChatId={selectedChatId}
                        onSelectChat={setSelectedChatId}
                    />
                </div>
                <div className="flex-1 bg-white">
                    {selectedChatId ? (
                        <ChatWindow chatRoomId={selectedChatId} />
                    ) : (
                        <div className="flex bg-[#1C1C1C] items-center justify-center h-full text-white">
                            Selecione uma conversa para começar
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 