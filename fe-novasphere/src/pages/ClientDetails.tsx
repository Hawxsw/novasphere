import { useParams } from 'react-router-dom'
import { useClientDetails } from '@/hooks/useClientDetails'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const ClientDetails = () => {
    const { id } = useParams<{ id: string }>()
    const { client, interactions, isLoading } = useClientDetails(id!)

    if (isLoading) {
        return <div className="flex justify-center p-8">Carregando...</div>
    }

    if (!client) {
        return <div className="text-center p-8">Cliente não encontrado</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
                    <p className="text-gray-500">{client.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${client.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {client.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Informações</h2>
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                            <dd className="mt-1 text-sm text-gray-900">{client.phone}</dd>
                        </div>
                        {client.company && (
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                                <dd className="mt-1 text-sm text-gray-900">{client.company}</dd>
                            </div>
                        )}
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Cliente desde</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {format(new Date(client.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="card">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Histórico de Interações</h2>
                    <div className="space-y-4">
                        {interactions?.map((interaction) => (
                            <div key={interaction.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {interaction.type === 'email' ? 'Email' :
                                                interaction.type === 'call' ? 'Chamada' : 'Reunião'}
                                        </p>
                                        <p className="text-sm text-gray-500">{interaction.description}</p>
                                    </div>
                                    <time className="text-xs text-gray-500">
                                        {format(new Date(interaction.date), "dd/MM/yyyy 'às' HH:mm")}
                                    </time>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 