import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import apiClient from '@/api/apiClient'

interface DashboardMetrics {
    totalClients: number
    activeClients: number
    totalInteractions: number
    averageResponseTime: number
    satisfactionRate: number
    dailyInteractions: {
        date: string
        count: number
    }[]
}

export const Dashboard = () => {
    const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
        queryKey: ['dashboard-metrics'],
        queryFn: async () => {
            const { data } = await apiClient.get('/metrics/dashboard')
            return data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center p-8">Carregando...</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-[#1C1C1C]">
                    <h3 className="text-sm font-medium text-white">Total de Clientes</h3>
                    <p className="mt-2 text-3xl font-semibold text-white">{metrics?.totalClients}</p>
                </div>
                <div className="card bg-[#1C1C1C]">
                    <h3 className="text-sm font-medium text-white">Clientes Ativos</h3>
                    <p className="mt-2 text-3xl font-semibold text-green-600">{metrics?.activeClients}</p>
                </div>
                <div className="card bg-[#1C1C1C]">
                    <h3 className="text-sm font-medium text-white">Tempo Médio de Resposta</h3>
                    <p className="mt-2 text-3xl font-semibold text-blue-600">
                        {metrics?.averageResponseTime}min
                    </p>
                </div>
                <div className="card bg-[#1C1C1C]">
                    <h3 className="text-sm font-medium text-white">Taxa de Satisfação</h3>
                    <p className="mt-2 text-3xl font-semibold text-indigo-600">
                        {metrics?.satisfactionRate}%
                    </p>
                </div>
            </div>

            <div className="card bg-[#1C1C1C]">
                <h3 className="text-lg font-medium text-white mb-4">Interações Diárias</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metrics?.dailyInteractions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
} 