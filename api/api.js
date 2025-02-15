
import axios from 'axios';

export const ApiManage = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    responseType: "json",
    withCredentials: true,
})