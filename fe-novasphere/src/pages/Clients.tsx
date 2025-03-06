import { ClientList } from '@/components/Clients/ClientList'
import { useClients } from '@/hooks/useClients'
import { Button } from '@/components/ui/button'
export const Clients = () => {
    const { createClient } = useClients()

    const handleCreateClient = () => {
        createClient.mutate({
            name: 'Novo Cliente',
            email: 'cliente@exemplo.com',
            phone: '(00) 00000-0000',
            status: 'active'
        })
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-white">Clientes</h1>
                <Button
                    onClick={handleCreateClient}
                    className="btn-primary bg-[#1C1C1C] text-white placeholder:text-white border-white"
                >
                    Novo Cliente
                </Button>
            </div>
            <ClientList />
        </div>
    )
} 