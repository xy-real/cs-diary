import { useQuery, keepPreviousData } from '@tanstack/react-query'; // 1. Import the function
import axios from '../../lib/axios';
import { Post } from '../../types/models';

interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

export const usePosts = (page: number = 1) => {
    return useQuery({
        queryKey: ['posts', page],
        queryFn: async () => {
            const { data } = await axios.get<PaginatedResponse<Post>>(`/api/posts?page=${page}`);
            return data;
        },
        // 2. Assign the imported function to placeholderData
        placeholderData: keepPreviousData, 
    });
};