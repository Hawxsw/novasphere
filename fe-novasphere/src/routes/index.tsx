import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Organization } from '../pages/Organization';
import { PrivateRoute } from '../components/PrivateRoute';
import { Register } from '../pages/Register';
import { Users } from '../pages/Users';
import { WhatsAppSessions } from '../pages/WhatsAppSessions';
import { ChatbotFlows } from '../pages/ChatbotFlows';
import { Messages } from '../pages/Messages';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Layout />
            </PrivateRoute>
        ),
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/organization',
                element: <Organization />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/whatsapp',
                element: <WhatsAppSessions />
            },
            {
                path: '/chatbot',
                element: <ChatbotFlows />
            },
            {
                path: '/messages',
                element: <Messages />
            },
            {
                path: '*',
                element: <Navigate to="/" replace />
            }
        ]
    }
]); 