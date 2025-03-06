import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/apiClient'
import { Table, TableHeader, TableRow, TableBody, TableCell, TableHead } from '@/components/ui/table'

interface Employee {
    id: string
    name: string
    email: string
    role: string
    department: string
    status: 'active' | 'inactive'
}

export const Organization = () => {
    const { data: employees, isLoading } = useQuery<Employee[]>({
        queryKey: ['employees'],
        queryFn: async () => {
            const { data } = await apiClient.get('/organization/employees')
            return data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center p-8">Carregando...</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-white">Organização</h1>

            <div className="card bg-[#1C1C1C]">
                <div className="flex flex-col ">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-[#1C1C1C]">
                                <Table className="min-w-full divide-y divide-gray-200">
                                    <TableHeader className="bg-[#1C1C1C]">
                                        <TableRow>
                                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                Nome
                                            </TableHead>
                                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                Cargo
                                            </TableHead>
                                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                Departamento
                                            </TableHead>
                                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                Status
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="bg-[#1C1C1C] divide-y divide-gray-200">
                                        {employees?.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={`https://ui-avatars.com/api/?name=${employee.name}`}
                                                                alt={employee.name}
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-white">
                                                                {employee.name}
                                                            </div>
                                                            <div className="text-sm text-white">
                                                                {employee.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-white">{employee.role}</div>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-white">{employee.department}</div>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}       