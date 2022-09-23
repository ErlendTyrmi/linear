import { AxiosError, AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import store from '../stores/store';

const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.interceptors.response.use();
axios.defaults.withCredentials = true;

// Response interceptor
axios.interceptors.response.use(
    function (response: AxiosResponse) {
        console.log(response);
        return response;
    },

    function (error: AxiosError) {
        // Redirect to login if 401 error
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
            console.log('was 401');
            // Logout (and clear stores) on 401
            runInAction(() => {
                store.session.logout();
            });
        }
        console.log(error);
        // return Promise.reject(error);
    }
);

export const linearAPI = {
    get: (url: string): Promise<AxiosResponse> => axios.get(url)
};
