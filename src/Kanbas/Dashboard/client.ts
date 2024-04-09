import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
const axiosWithCredentials = axios.create({
    baseURL: `${BASE_API}/api`,
    withCredentials: true,
});
export interface Course {
    _id: string;
    name: string;
    section: string;
    description: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
};
export const createCourse = async (course: any) => {
    const response = await axiosWithCredentials.post(`/courses`, course);
    return response.data;
};
export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`/courses/${course._id}`, course);
    return response.data;
};
export const deleteCourse = async (course: any) => {
    const response = await axiosWithCredentials.delete(`/courses/${course._id}`);
    return response.data;
};
export const findAllCourses = async () => {
    const response = await axiosWithCredentials.get(`/courses`);
    return response.data;
};
export const findCourseById = async (course: any) => {
    const response = await axiosWithCredentials.get(`/courses/${course._id}`);
    return response.data;
};