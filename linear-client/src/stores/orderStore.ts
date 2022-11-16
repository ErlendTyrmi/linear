import { makeAutoObservable } from 'mobx';
import { isThisTypeNode } from 'typescript';
import { Order, OrderDTO } from '../entities/order';
import { linearAPI } from '../network/api';
import { OrderConverters } from '../utility/orderconverters';
import { OrderCategory as OrderCategory, OrderTypeName } from '../utility/orderEnums';
import store from './store';

export class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Order[] = [];
    // Global cats live across all advertisers
    presetFilters: OrderCategory[] = [];

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setPresetFilters([]);
        this.setData([]);
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Order[]) => (this.data = data);
    setPresetFilters = (categories: OrderCategory[]) => (this.presetFilters = categories);
    addPresetFilter = (category: OrderCategory) => {
        if (!this.presetFilters.includes(category)) this.presetFilters.push(category);
    };
    removePresetFilter = (category: OrderCategory) => {
        this.presetFilters.forEach((item, index) => {
            if (item === category) this.presetFilters.splice(index, 1);
        });
    };

    // // Return orders with the more permanent filter settings
    // GetOrdersWithDefaultCategoriesAndFilter(filter: string | null) {
    //     return this.getOrdersWithPresetFiltersAndSearch(this.presetFilters, filter);
    // }

    // Return orders with arguments, possibly ignoring preset state
    getOrdersWithFiltersAndSearch(categories: OrderCategory[] | null, filter: string | null) {
        var orders: Order[] = this.data ?? [];

        if (categories !== null && categories.length > 0) {
            orders = this.applyCategories(orders, categories);
        }

        return this.filterOrders(filter, orders);
    }

    applyCategories(orders: Order[], categories: OrderCategory[]): Order[] {
        categories.forEach((cat) => {
            if (cat === OrderCategory.selectedAdvertiser) {
                orders = orders.filter((it) => it.advertiserId === store.advertiser.getSelectedAdvertiser()?.id);
            } else if (cat === OrderCategory.allFavorites) {
                orders = orders.filter((it) => store.advertiser.getFavoriteIds().includes(it.advertiserId));
            }

            if (cat === OrderCategory.overBudget) {
                orders = orders.filter((it) => it.orderBudget < it.orderTotal);
            }

            // if (cat === OrderCategory.exposure) {
            //     orders = orders.filter((it) => it.orderTypeName === OrderTypeName.exposure);
            // } else if (cat === OrderCategory.specifics) {
            //     orders = orders.filter((it) => it.orderTypeName === OrderTypeName.specific);
            // }
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
