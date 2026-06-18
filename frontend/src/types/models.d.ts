export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    is_published: boolean;
    // The author is optional because we conditionally load it in the Laravel API Resource
    author?: User; 
    created_at: string;
    updated_at: string;
}