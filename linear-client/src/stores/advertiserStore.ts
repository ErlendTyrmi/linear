import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Advertiser } from '../entities/advertiser';

import { linearAPI } from '../network/api';
import store from './store';

export class AdvertiserStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'advertisers',
            properties: ['data', 'selected'],
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
    data: Advertiser[] = [];
    selected: string | undefined = undefined;

    // Clear
    clear = () => {
        this.setLoading(false);
        this.data = [];
        this.selected = undefined;
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Advertiser[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
        console.log(this.selected);
    }

    // API Methods
    async getAdvertisers() {
        this.setLoading(true);
        const url = store.session.user?.isAdmin ? 'advertiser/all' : '/advertiser/own';
        const response = await linearAPI.get(url);
        this.setData(response.data);
        if (this.selected === undefined) {
            this.setInitialSelected(this.data);
        }
        this.setLoading(false);
    }

    private setInitialSelected(data: Advertiser[]) {
        var first = this.data.at(0);
        if (first !== undefined) {
            this.setSelected(first.id);
            console.log('Initial selected: ' + this.selected);
        }
    }
}

export default new AdvertiserStore();
