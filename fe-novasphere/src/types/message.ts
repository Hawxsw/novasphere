export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
} 