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
    favorites: Advertiser[] = [];
    selected: string | undefined = undefined;

    // Clear
    clear = () => {
        this.setLoading(false);
        this.advertisers = [];
        this.favorites = [];
        this.selected = undefined;
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setAdvertisers = (data: Advertiser[]) => (this.advertisers = data);
    setFavorites = (data: Advertiser[]) => (this.favorites = data);
    setSelected(value: string) {
        this.selected = value;
        console.log(this.selected);
    }

    // API Methods
    async loadAdvertisers() {
        this.setLoading(true);
        const url = store.session.user?.isAdmin ? '/advertiser/all/' : '/advertiser/own/';
        const response = await linearAPI.get(url);
        if (response.data.length > 0) this.setAdvertisers(response.data);
        this.setInitialSelected();
        this.setLoading(false);
    }

    async loadFavorites() {
        this.setLoading(true);
        const response = await linearAPI.get('/advertiser/favorites/');
        if (response.data.length > 0) this.setFavorites(response.data);
        this.setInitialSelected();
        this.setLoading(false);
    }

    async postFavorites(favorites: Advertiser[]) {
        this.setLoading(true);
        const response = await linearAPI.post('/advertiser/favorites/', favorites);
        this.setFavorites(response.data);
        this.setInitialSelected();
        this.setLoading(false);
    }

    async addFavoriteAndUpload(data: Advertiser) {
        this.favorites.push(data);
        await this.postFavorites(this.favorites);
        this.setLoading(false);
    }

    async removeFavoriteAndUpload(data: Advertiser) {
        let newFavorites = this.favorites.filter((advertiser) => advertiser.id !== data.id);
        this.setFavorites(newFavorites);
        await this.postFavorites(this.favorites);
    }

    // Helpers
    getAdvertiser(selected: string | undefined): Advertiser | undefined {
        let advertiser = this.advertisers.find((it) => it.id === selected);
        return advertiser;
    }

    getFavoriteIds() {
        if (this.favorites.length > 0) return this.favorites.map((it) => it.id);
        return [];
    }

    private setInitialSelected() {
        if (this.favorites.length < 1) {
            this.selected = undefined;
            return;
        }
        var first = this.favorites.at(0);
        if (first !== undefined) {
            this.setSelected(first.id);
        }
    }
}

export default new AdvertiserStore();
