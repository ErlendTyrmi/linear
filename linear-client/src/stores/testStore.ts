import { Axios, AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { User } from '../entities/user';

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
    getDataForUser = async (user: User) => {
        this.setLoading(true);
        linearAPI.getWithUserId('/order/mine', user.id).then((response: AxiosResponse) => {
            this.setData(response.data);
            this.setLoading(false);
        });
    };
}

export default new TestStore();
