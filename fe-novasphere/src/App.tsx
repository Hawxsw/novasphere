import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { useAuth } from '@/hooks/useAuth'

// Pages
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Clients } from '@/pages/Clients'
import { ClientDetails } from '@/pages/ClientDetails'
import { Messenger } from '@/pages/Messenger'
import { Organization } from '@/pages/Organization'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<ClientDetails />} />
        <Route path="messenger" element={<Messenger />} />
        <Route path="organization" element={<Organization />} />
      </Route>
    </Routes>
  )
}

export default App
