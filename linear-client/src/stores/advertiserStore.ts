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
            properties: ['data', 'favorites', 'selected'],
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
    data: Advertiser[] = [];
    favorites: Advertiser[] = [];
    selected: string | undefined = undefined;

    // Clear
    clear = () => {
        this.setIsLoading(false);
        this.data = [];
        this.favorites = [];
        this.selected = undefined;
    };

    setIsLoading = (loading: boolean) => (this.isLoading = loading);
    setAdvertisers = (data: Advertiser[]) => (this.data = data);
    setFavorites = (data: Advertiser[]) => (this.favorites = data);
    setSelected(value: string) {
        this.selected = value;
    }
    getAdvertiser(selected: string | undefined): Advertiser | undefined {
        let advertiser = this.favorites?.find((it) => it.id === selected);
        return advertiser;
    }
    getSelectedAdvertiser() {
        return this.getAdvertiser(this.selected);
    }
    getFavoriteIds() {
        if (this.favorites && this.favorites?.length > 0) return this.favorites.map((it) => it.id);
        return [];
    }

    // API Methods
    async loadAdvertisers() {
        this.setIsLoading(true);
        const url = store.session.user?.isAdmin ? '/advertiser/all/' : '/advertiser/own/';
        const response = await linearAPI.get(url);
        if (response.data?.length > 0) this.setAdvertisers(response.data);
        this.setInitialSelected();
        this.setIsLoading(false);
    }

    async loadFavorites() {
        this.setIsLoading(true);
        const response = await linearAPI.get('/advertiser/favorites/');
        if (response.data && response.data.length > 0) this.setFavorites(response.data);
        this.setInitialSelected();
        this.setIsLoading(false);
    }

    async postFavorites(favorites: Advertiser[]) {
        this.setIsLoading(true);
        const response = await linearAPI.post('/advertiser/favorites/', favorites);
        this.setFavorites(response.data);
        this.setInitialSelected();
        this.setIsLoading(false);
    }

    async addFavoriteAndUpload(data: Advertiser) {
        this.favorites?.push(data);
        await this.postFavorites(this.favorites);
        this.setIsLoading(false);
    }

    async removeFavoriteAndUpload(data: Advertiser) {
        let newFavorites = this.favorites.filter((advertiser) => advertiser.id !== data.id);
        this.setFavorites(newFavorites);
        await this.postFavorites(this.favorites);
    }

    // Helpers

    private setInitialSelected() {
        if (!this.favorites || this.favorites.length < 1) {
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
