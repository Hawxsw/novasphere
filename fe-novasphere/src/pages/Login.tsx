import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Logo } from '@/assets/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const { login, isAuthenticated } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        login.mutate(credentials)
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#1C1C1C] text-white">
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-[400px] space-y-8">
                    <div className="space-y-6">
                        <Logo />

                        <div>
                            <h1 className="text-2xl font-medium">Bem Vindo de volta</h1>
                            <p className="text-sm text-gray-400">Faça login na sua conta</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="block text-sm text-gray-400">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="block text-sm text-gray-400">
                                        Senha
                                    </Label>
                                    <Button type="button" className="text-sm text-gray-400 hover:text-white bg-transparent border-none hover:bg-transparent hover:text-green-500">
                                        Esqueceu sua senha?
                                    </Button>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="mt-1"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={login.isPending}
                            className="w-full bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm font-medium text-white"
                            variant="default"
                        >
                            {login.isPending ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Entrando...
                                </span>
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
} 