import { makeAutoObservable } from 'mobx';
import { Order } from '../entities/order';
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
    getOrdersForCurrentAdvertiser() {
        let id = store.advertiser.selected;
        if (id === undefined) return [];

        return this.data?.filter((it) => {
            let itsId = it.advertiserId;
            return itsId && itsId === id;
        });
    }

    getOrdersForAllFavoriteAdvertisers() {
        var myAdvertisers = store.advertiser.getFavoriteIds();
        if (myAdvertisers.length < 1) return [];

        return this.data?.filter((it) => {
            let advId = it.advertiserId;
            return advId && myAdvertisers.includes(advId);
        });
    }

    getOrdersOverBudgetForAllSelected() {
        var myAdvertisers = store.advertiser.getFavoriteIds();
        if (myAdvertisers.length < 1) return [];
        return this.data?.filter((it: Order) => myAdvertisers.includes(it.advertiserId) && it.orderTotal > it.orderBudget);
    }
    getOrdersOverBudget() {
        let id = store.advertiser.selected;
        if (id === undefined) return [];
        return this.data?.filter((it: Order) => it.advertiserId === id && it.orderTotal > it.orderBudget);
    }

    // API Methods
    async loadOrders() {
        this.loading = true;
        const response = await linearAPI.get('/order/own/');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new OrderStore();
