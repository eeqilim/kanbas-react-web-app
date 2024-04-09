import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
const COURSES_API = `${BASE_API}/api/courses`;
const MODULES_API = `${BASE_API}/api/modules`;
const axiosWithCredentials = axios.create({
    baseURL: `${BASE_API}/api`,
    withCredentials: true,
});
export interface Lesson {
    _id: string;
    name: string;
    module: string;
};
export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
};
export const createModule = async (module: any) => {
    const response = await axiosWithCredentials.post(`/modules`, module);
    return response.data;
};
export const updateModule = async (module: any) => {
    const response = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return response.data;
};
export const deleteModule = async (module: any) => {
    const response = await axiosWithCredentials.delete(`${MODULES_API}/${module._id}`);
    return response.data;
};
export const findAllModules = async (courseId: any) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};