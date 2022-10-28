import { Axios, AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { Advertiser } from '../entities/advertiser';
import { User } from '../entities/user';

import { linearAPI } from '../network/api';
import store from './store';

export class AdvertiserStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Advertiser[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.data = [];
        this.selected = '';
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Advertiser[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    getDataForUser = async (userId: string) => {
        this.setLoading(true);

        linearAPI.get('/advertiser/own').then((response: AxiosResponse) => {
            this.setData(response.data);
            this.setLoading(false);
        });
    };
}

export default new AdvertiserStore();
