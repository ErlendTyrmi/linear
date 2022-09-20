import { AxiosResponse } from 'axios';

const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.interceptors.response.use();
axios.defaults.withCredentials = true;

export const linearAPI = {
    get: (url: string): Promise<AxiosResponse> => axios.get(url)
};
