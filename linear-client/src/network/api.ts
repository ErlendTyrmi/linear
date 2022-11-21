import { AxiosError, AxiosResponse } from 'axios';
import { appText } from '../assets/appText';
import store from '../stores/store';

const axios = require('axios').default;
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.interceptors.response.use();
// axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

// Response interceptor
axios.interceptors.response.use(
    function (response: AxiosResponse) {
        return response;
    },
    function (error: AxiosError) {
        // Redirect to login if 401 error
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
            // Logout on 401
            console.log('Rejected by Axios Interceptor. Logging out... ' + error);
            store.session.logout();
            store.message.addError(appText.errorLogin());
        } else if (error.code === AxiosError.ERR_NETWORK) {
            console.log('Rejected by Axios Interceptor: ' + error);
            store.message.addWarning(appText.errorNetwork());
        } else {
            console.log('Rejected by Axios Interceptor: ' + error);
            store.message.addError(appText.error() + ' ' + error.code);
        }
        return Promise.allSettled;
    }
);

export const linearAPI = {
    post: (url: string, param: any): Promise<AxiosResponse> => axios.post(url, param),
    get: (url: string): Promise<AxiosResponse> => axios.get(url),
    getWithParams: (url: string, data: {}): Promise<AxiosResponse> => axios.get(url, data),
    delete: (url: string, payload: {}): Promise<AxiosResponse> => axios.delete(url, { data: payload })
};
