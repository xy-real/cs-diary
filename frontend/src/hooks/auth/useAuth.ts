import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { User } from '@/types/models';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // 1. Fetch Authenticated User
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await axios.get<User>('/api/user');
            return data;
        },
        retry: false, // Do not retry if the user is unauthenticated (401)
    });

    // 2. Initialize CSRF Protection
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    // 3. Login Mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: Record<string, string>) => {
            await csrf(); // MUST execute before posting credentials
            await axios.post('/api/login', credentials);
        },
        onSuccess: () => {
            // Force React Query to re-fetch the user immediately
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
    });

    // 4. Logout Mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axios.post('/api/logout');
        },
        onSuccess: () => {
            // Wipe the user from cache and clear any protected data
            queryClient.setQueryData(['authUser'], null);
            queryClient.clear(); 
        },
    });

    return {
        user,
        isLoading,
        isError,
        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
    };
};