import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { apiDefineProperty } from 'mobx/dist/internal';
import { Order } from '../entities/order';
import { linearAPI } from '../network/api';
import store from './store';

export class BookingStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'booking',
            properties: ['isNewOrder', 'currentOrderId'],
            storage: window.localStorage,
            expireIn: 48 * 60 * 60000, // 48h or on logout
            removeOnExpiration: true
        }).then(
            action((persistStore) => {
                console.log(persistStore.isHydrated ? 'channels hydrated' : 'channels failed to hydrate');
            })
        );
    }

    // Variables
    isLoading: boolean = false;
    isNewOrder: boolean = true;
    currentOrderId: string = '';

    // Clear
    clear = () => {
        this.setIsLoading(false);
        this.setIsNewOrder(true);
    };

    setIsLoading = (loading: boolean) => (this.isLoading = loading);
    setIsNewOrder = (newOrder: boolean) => (this.isNewOrder = newOrder);
    setCurrentOrder = (order: Order | null) => {
        this.currentOrderId = order?.id ?? '';
    };
    getCurrentOrder = () => {
        return store.order.data.find((it) => it.id === this.currentOrderId);
    };

    getCurrentOrderBudgetDiff() {
        let order = this.getCurrentOrder();
        if (order !== undefined) return order.orderTotal - order.orderBudget;

        return -1;
    }
}

export default new BookingStore();
