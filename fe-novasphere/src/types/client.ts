export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastInteraction?: string;
}

export interface ClientInteraction {
  id: string;
  clientId: string;
  type: 'email' | 'call' | 'meeting';
  description: string;
  date: string;
  agentId: string;
} 