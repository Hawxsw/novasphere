import { useState } from 'react'
import { useClients } from '@/hooks/useClients'
import { Client } from '@/types/client'
import { Input } from '../ui/input'
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from '../ui/select'
export const ClientList = () => {
    const [filters, setFilters] = useState({
        search: '',
        status: 'active'
    })

    const { clients, isLoading } = useClients(filters)

    if (isLoading) {
        return <div className="flex justify-center p-8">Carregando...</div>
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex gap-4">
                <Input
                    type="text"
                    placeholder="Buscar clientes..."
                    className="input-field bg-[#1C1C1C] text-white placeholder:text-white border-white"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
                <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                    <SelectTrigger className="input-field bg-[#1C1C1C] text-white placeholder:text-white border-white">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Ativos</SelectItem>
                        <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-4">
                {clients?.map((client: Client) => (
                    <div key={client.id} className="card">
                        <h3 className="text-lg font-semibold">{client.name}</h3>
                        <p className="text-gray-600">{client.email}</p>
                        <p className="text-gray-600">{client.phone}</p>
                        <div className="mt-2">
                            <span className={`px-2 py-1 rounded-full text-sm ${client.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {client.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 