import httpClient from '@/plugins/httpClient';
import type { User } from '@/types/User';

httpClient.defaults.withCredentials = true;
httpClient.defaults.withXSRFToken = true;

export const UserService = {
    async getUsers(): Promise<User[]> {
        const response = await httpClient.get('/api/users');
        return response.data;
    },
    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const response = await httpClient.post('/api/users', user);
        return response.data;
    },
    async updateUser(id: number, user: Partial<User>): Promise<User> {
        const response = await httpClient.put(`/api/users/${id}`, user);
        return response.data;
    },
    async deleteUser(id: number): Promise<void> {
        await httpClient.delete(`/api/users/${id}`);
    },
};