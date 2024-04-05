import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
const axiosWithCredentials = axios.create({
    baseURL: `${BASE_API}/api`,
    withCredentials: true,
});

export interface User {
    _id: string; username: string; password: string; role: string;
    firstName: string, lastName: string
};
export const signin = async (credentials: User) => {
    const response = await axiosWithCredentials.post(`/users/signin`, credentials);
    return response.data;
};
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`/users/signup`, user);
    return response.data;
};
export const signout = async () => {
    const response = await axiosWithCredentials.post(`/users/signout`);
    return response.data;
};
export const profile = async () => {
    const response = await axiosWithCredentials.post(`/users/profile`);
    return response.data;
};
export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`/users/${user._id}`, user);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(`/users`);
    return response.data;
};
export const createUser = async (user: any) => {
    const response = await axiosWithCredentials.post(`/users`, user);
    return response.data;
};
export const deleteUser = async (user: any) => {
    const response = await axiosWithCredentials.delete(
        `/users/${user._id}`);
    return response.data;
};
export const findUserById = async (id: string) => {
    const response = await axiosWithCredentials.get(`/users/${id}`);
    return response.data;
};
export const findUsersByRole = async (role: string) => {
    const response = await
        axiosWithCredentials.get(`/users?role=${role}`);
    return response.data;
};