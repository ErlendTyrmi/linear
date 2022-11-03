import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { SalesProduct } from '../entities/salesProduct';
import { linearAPI } from '../network/api';

export class SalesProductStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'salesProducts',
            properties: ['data'],
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
    loading: boolean = false;
    data: SalesProduct[] = [];
    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: SalesProduct[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    async getSalesProducts() {
        this.setLoading(true);
        const response = await linearAPI.get('/salesProduct');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new SalesProductStore();
