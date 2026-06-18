'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import { usePosts } from '../hooks/api/usePosts';

export default function HomePage() {
    const { user, isLoading: authLoading } = useAuth();
    const [page, setPage] = useState(1);
    
    // Fetch public published posts
    const { data: postsData, isLoading: postsLoading, isError } = usePosts(page);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Navigation Bar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-black tracking-tight text-gray-900">
                        Jared&apos;s Tech Blog
                    </h1>
                    <nav>
                        {authLoading ? null : user ? (
                            <Link 
                                href="/dashboard" 
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Admin Dashboard &rarr;
                            </Link>
                        ) : (
                            <Link 
                                href="/login" 
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight mb-2">Latest Writings</h2>
                    <p className="text-lg text-gray-600">Thoughts, tutorials, and architectural patterns.</p>
                </header>

                {postsLoading ? (
                    <div className="animate-pulse space-y-8">
                        {[1, 2, 3].map((skeleton) => (
                            <div key={skeleton} className="h-32 bg-gray-200 rounded-lg w-full"></div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                        Failed to load posts. Is the Laravel API running?
                    </div>
                ) : postsData?.data.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500">No published posts yet. Check back later!</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {postsData?.data.map((post) => (
                            <article key={post.id} className="group cursor-pointer">
                                <Link href={`/posts/${post.slug}`}>
                                    <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <span className="font-medium text-gray-700">
                                            {post.author?.name || 'Unknown Author'}
                                        </span>
                                        <span>&bull;</span>
                                        <time dateTime={post.created_at}>
                                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {/* Basic Pagination Controls */}
                {postsData && postsData.meta.last_page > 1 && (
                    <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-500">
                            Page {page} of {postsData.meta.last_page}
                        </span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === postsData.meta.last_page}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}