import httpClient from '../httpClient';
import type { User } from '../types/user';

export const UserService = {
    async getUsers(): Promise<User[]> {
        const response = await httpClient.get('/users');
        return response.data;
    },
    async getUserById(id: number): Promise<User> {
        const response = await httpClient.get(`/users/${id}`);
        return response.data;
    },
    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const response = await httpClient.post('/users', user);
        return response.data;
    },
};