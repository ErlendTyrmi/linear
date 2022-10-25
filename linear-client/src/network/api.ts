import { AxiosError, AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import { appText } from '../appText';
import { User } from '../entities/user';

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
            store.session.clear();
            store.session.logout();
            store.message.setError(appText.errorLogin['da']);
        } else if (error.code === AxiosError.ERR_NETWORK) {
            console.log('Rejected by Axios Interceptor: ' + error);
            store.message.setError(appText.errorNetwork['da']);
        } else {
            console.log('Rejected by Axios Interceptor: ' + error);
            store.message.setError(appText.error['da'] + ' ' + error.code);
        }
        return Promise.allSettled;
    }
);

export const linearAPI = {
    post: (url: string, param: any): Promise<AxiosResponse> => axios.post(url, param),
    get: (url: string): Promise<AxiosResponse> => axios.get(url),
    getWithUserId: (url: string, userId: String): Promise<AxiosResponse> => axios.get(url, { params: { userId: userId } })
    // put
    // delete
};

// export const useGet = (url: string, payload: any) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState('');
//     const [loaded, setLoaded] = useState(false);

//     useEffect(() => {
//         axios
//             .get(url, payload)
//             .then((response: AxiosResponse) => setData(response.data))
//             .catch((error: AxiosError) => setError(error.message))
//             .finally(() => setLoaded(true));
//     }, []);

//     return { data, error, loaded };
// };
