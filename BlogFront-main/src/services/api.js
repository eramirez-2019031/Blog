import { data } from "autoprefixer";
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/blog/v1',
    timeout: 10000
})

export const deleteProjects = async (id) => {
    try {
        return await apiClient.delete(`/projects/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProjects = async () => {
    try {
        return await apiClient.get('/projects/')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const searchProject = async (id) => {
    try {
        return await apiClient.get(`/projects/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const postProject = async (data) => {
    try {
        return await apiClient.post('/projects/', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}