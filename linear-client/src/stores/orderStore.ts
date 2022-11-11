import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { Order } from '../entities/order';
import { User } from '../entities/user';

import { linearAPI } from '../network/api';
import store from './store';

export class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Order[] = [];

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Order[]) => (this.data = data);

    // API Methods
    async loadOrders() {
        this.loading = true;
        const response = await linearAPI.get('/order/own/');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new OrderStore();
