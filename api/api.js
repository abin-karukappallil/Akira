
import axios from 'axios';

export const ApiManage = axios.create({
    baseURL: '',
    responseType: "json",
    withCredentials: true,
})