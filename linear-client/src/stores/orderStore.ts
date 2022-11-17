import { makeAutoObservable } from 'mobx';
import { isThisTypeNode } from 'typescript';
import { Advertiser } from '../entities/advertiser';
import { Order, OrderDTO } from '../entities/order';
import { linearAPI } from '../network/api';
import { OrderConverters } from '../utility/orderconverters';
import { OrderFilter as OrderFilter } from '../utility/orderEnums';
import store from './store';

export class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Order[] = [];
    // When calling getOrders, these filters are used
    // when the state should be valid across multple advertisers.
    presetFilters: OrderFilter[] = [];

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setPresetFilters([]);
        this.setData([]);
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Order[]) => (this.data = data);
    setPresetFilters = (categories: OrderFilter[]) => (this.presetFilters = categories);
    addPresetFilter = (category: OrderFilter) => {
        if (!this.presetFilters.includes(category)) this.presetFilters.push(category);
    };
    removePresetFilter = (category: OrderFilter) => {
        this.presetFilters.forEach((item, index) => {
            if (item === category) this.presetFilters.splice(index, 1);
        });
    };

    // Return orders with filters and search
    getOrdersWithFiltersAndSearch(filters: OrderFilter[] | null, searchFilter: string | null) {
        var orders: Order[] = this.data ?? [];

        if (filters !== null && filters.length > 0) {
            orders = this.applyFilters(orders, filters);
        }

        return this.filterOrders(searchFilter, orders);
    }

    // Return orders for a single advertiser with arguments
    getOrdersWithFiltersAndAdvertiser(categories: OrderFilter[] | null, advertiserId: string) {
        var orders: Order[] = this.data ?? [];

        if (categories !== null && categories.length > 0) {
            orders = this.applyFilters(orders, categories);
        }

        return orders.filter((it) => it.advertiserId === advertiserId);
    }

    applyFilters(orders: Order[], categories: OrderFilter[]): Order[] {
        categories.forEach((cat) => {
            if (cat === OrderFilter.selectedAdvertiser) {
                orders = orders.filter((it) => it.advertiserId === store.advertiser.getSelectedAdvertiser()?.id);
            } else if (cat === OrderFilter.allFavorites) {
                orders = orders.filter((it) => store.advertiser.getFavoriteIds().includes(it.advertiserId));
            }

            if (cat === OrderFilter.overBudget) {
                orders = orders.filter((it) => it.orderBudget < it.orderTotal);
            }
        });
        return orders;
    }

    filterOrders(filter: string | null, orders: Order[]) {
        if (filter === null || filter === '') return orders;
        return orders.filter((it) => {
            return it.advertiserProductName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || it.advertiserName.includes(filter);
        });
    }

    // API Methods
    async loadOrders() {
        this.loading = true;
        const response = await linearAPI.get('/order/own/');
        const orders: Order[] = [];
        (response.data as OrderDTO[]).forEach((it) => {
            orders.push(OrderConverters.convertOrderFromDto(it));
        });
        this.setData(orders);
        this.setLoading(false);
    }
}

export default new OrderStore();
