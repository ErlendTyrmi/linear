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
            properties: ['advertisers', 'favorites', 'selected'],
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
    advertisers: Advertiser[] = [];
    favorites: any[] = [];
    selected: string | undefined = undefined;

    // Clear
    clear = () => {
        this.setLoading(false);
        this.advertisers = [];
        this.favorites;
        this.selected = undefined;
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setAdvertisers = (data: Advertiser[]) => (this.advertisers = data);
    setFavorites = (data: any[]) => (this.favorites = data);
    setSelected(value: string) {
        this.selected = value;
        console.log(this.selected);
    }

    // API Methods
    async getAdvertisers() {
        this.setLoading(true);
        const url = store.session.user?.isAdmin ? 'advertiser/all' : '/advertiser/own';
        const response = await linearAPI.get(url);
        this.setAdvertisers(response.data);
        if (this.selected === undefined) {
            this.setInitialSelected(this.advertisers);
        }
        this.setLoading(false);
    }

    async getFavorites() {
        this.setLoading(true);
        const response = await linearAPI.get('advertiser/favorites');
        this.setFavorites(response.data);
        if (this.selected === undefined) {
            //this.setSelected(this.favorites); // TODO: selected must be favorite - favorites auto update on select - selected means active for whole session
        }
        this.setLoading(false);
    }

    private setInitialSelected(data: Advertiser[]) {
        var first = this.advertisers.at(0);
        if (first !== undefined) {
            this.setSelected(first.id);
            console.log('Initial selected: ' + this.selected);
        }
    }
}

export default new AdvertiserStore();
