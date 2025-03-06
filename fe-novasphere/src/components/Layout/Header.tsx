import { useAuth } from '@/hooks/useAuth'
import { BellIcon } from '@heroicons/react/24/outline'
import { Logo } from '@/assets/Logo'
import { Button } from '../ui/button'


export const Header = () => {
    const { user, logout } = useAuth()

    return (
        <header className="bg-[#1C1C1C] border-b border-gray-800">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            className="relative p-2 text-gray-400 hover:text-white"
                        >
                            <BellIcon className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                        </Button>

                        <div className="flex items-center gap-3">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                                alt={user?.name}
                            />
                            <div className="hidden sm:flex sm:flex-col">
                                <span className="text-sm font-medium text-white">{user?.name}</span>
                                <span className="text-xs text-white">{user?.role}</span>
                            </div>
                            <Button
                                onClick={logout}
                                className="text-sm text-gray-400 hover:text-white "
                            >
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 