import { scopedCssBaselineClasses } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { isThisTypeNode } from 'typescript';
import { Advertiser } from '../entities/advertiser';
import { Order, OrderDTO } from '../entities/order';
import { linearAPI } from '../network/api';
import { OrderConverters } from '../utility/orderconverters';
import { OrderFilter as OrderFilter, OrderAdvertiserScope, OrderTypeName } from '../utility/orderEnums';
import store from './store';

export class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    isLoading: boolean = false;
    // All orders for bureau
    data: Order[] = [];
    // Filters toggled by user
    filter: OrderFilter = OrderFilter.none;
    // Which advertisers do you want to see
    advertiserScope: OrderAdvertiserScope = OrderAdvertiserScope.selectedAdvertiser;

    // Clear
    clear = () => {
        this.setIsLoading(false);
        this.setScope(OrderAdvertiserScope.selectedAdvertiser);
        this.setFilter(OrderFilter.none);
        this.setData([]);
    };

    setIsLoading = (loading: boolean) => (this.isLoading = loading);
    setData = (data: Order[]) => (this.data = data);
    setScope = (scope: OrderAdvertiserScope) => (this.advertiserScope = scope);
    setFilter = (filter: OrderFilter) => (this.filter = filter);

    // Return orders with filters and search
    getOrdersWithFiltersAndSearch(scope: OrderAdvertiserScope, filter: OrderFilter, searchFilter: string | null) {
        var orders: Order[] = this.data ?? [];
        orders = this.applyScope(scope, orders);
        orders = this.applyFilter(filter, orders);
        return this.applySearch(searchFilter, orders);
    }

    // Return orders for a single advertiser (other than selected) with arguments
    getOrdersByFilterAndAdvertiser(filter: OrderFilter, advertiserId: string | undefined) {
        if (advertiserId === undefined) return [];
        var orders: Order[] = this.data ?? [];
        orders = this.applyFilter(filter, orders);
        orders = orders.filter((it) => it.advertiserId === advertiserId);
        return orders;
    }

    // Scope filters by advertiser
    applyScope(scope: OrderAdvertiserScope, orders: Order[]): Order[] {
        if (scope === OrderAdvertiserScope.selectedAdvertiser) {
            return orders.filter((it) => it.advertiserId === store.advertiser.getSelectedAdvertiser()?.id);
        }

        if (scope === OrderAdvertiserScope.allFavorites) {
            return orders.filter((it) => store.advertiser.getFavoriteIds().includes(it.advertiserId));
        }

        return orders;
    }

    // User toggled filters
    applyFilter(filter: OrderFilter, orders: Order[]): Order[] {
        if (filter === OrderFilter.overBudget) {
            return orders.filter((it) => it.orderBudget < it.orderTotal);
        }

        if (filter === OrderFilter.specific) {
            return orders.filter((it) => it.orderTypeName === OrderTypeName.specific);
        }

        if (filter === OrderFilter.exposure) {
            return orders.filter((it) => it.orderTypeName === OrderTypeName.exposure);
        }

        return orders;
    }

    applySearch(filter: string | null, orders: Order[]): Order[] {
        if (filter === null || filter === '') return orders;

        return orders.filter((it) => {
            return it.advertiserProductName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || it.advertiserName.includes(filter);
        });
    }

    // API Methods
    async loadOrders() {
        this.isLoading = true;
        const response = await linearAPI.get('/order/own/');
        const orders: Order[] = [];
        (response.data as OrderDTO[])?.forEach((it) => {
            orders.push(OrderConverters.convertDtoToOrder(it));
        });
        this.setData(orders);
        this.setIsLoading(false);
    }

    // API Methods
    async loadOrder(orderId: string) {
        this.isLoading = true;
        const response = await linearAPI.get('/order/?id=' + orderId);
        const orders: Order[] = [];
        (response.data as OrderDTO[]).forEach((it) => {
            orders.push(OrderConverters.convertDtoToOrder(it));
        });
        this.setData(orders);
        this.setIsLoading(false);
    }
}

export default new OrderStore();
