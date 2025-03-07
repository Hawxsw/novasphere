import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/users', label: 'Usuários' },
        { path: '/whatsapp', label: 'WhatsApp' },
        { path: '/chatbot', label: 'Chatbot' },
        { path: '/messages', label: 'Mensagens' },
        { path: '/organization', label: 'Organização' }
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Sistema Admin</h1>
            </div>
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`block px-4 py-2 rounded transition-colors ${location.pathname === item.path
                                        ? 'bg-gray-700 text-white'
                                        : 'hover:bg-gray-700'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}; 