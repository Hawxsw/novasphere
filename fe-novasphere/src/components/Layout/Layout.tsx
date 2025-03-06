import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout = () => {
    return (
        <div className="min-h-screen bg-[#1C1C1C]">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6 text-white">
                    <Outlet />
                </main>
            </div>
        </div>
    )
} 