import { Axios, AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { linearAPI } from '../network/api';
import store from './store';

export class TestStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: any = [];

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData('');
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: string) => (this.data = data);

    // API Methods
    getData = async () => {
        this.setLoading(true);
        linearAPI.get('/order/all').then((response: AxiosResponse) => {
            this.setLoading(false);
            this.setData(response.data);
        });
    };
}

export default new TestStore();
