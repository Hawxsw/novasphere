import { NavLink } from 'react-router-dom'
import {
    HomeIcon,
    UserGroupIcon,
    ChatBubbleLeftRightIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Clientes', href: '/clients', icon: UserGroupIcon },
    { name: 'Mensagens', href: '/messenger', icon: ChatBubbleLeftRightIcon },
    { name: 'Organização', href: '/organization', icon: BuildingOfficeIcon },
]

export const Sidebar = () => {
    return (
        <nav className="w-64 bg-[#1C1C1C] border-r border-gray-200 min-h-[calc(100vh-4rem)]">
            <div className="p-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg
              ${isActive
                                ? 'text-white bg-green-600'
                                : 'text-white hover:text-gray-900 hover:bg-green-600'
                            }
            `}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
} 