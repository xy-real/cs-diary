'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/auth/useAuth';

export default function DashboardPage() {
    const router = useRouter();
    const { user, isLoading, logout } = useAuth();

    // Strict Frontend Route Guard
    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    // Show a loading state while React Query fetches the /api/user endpoint
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Authenticating...</p>
            </div>
        );
    }

    // Prevent a flash of unauthorized content before the redirect fires
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        Welcome, <strong>{user.name}</strong>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                        Log out
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <p className="text-gray-500">Post management table will go here.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}