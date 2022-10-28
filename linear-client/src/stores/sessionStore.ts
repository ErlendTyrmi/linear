import { AxiosResponse } from 'axios';
import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { useEffect } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { User } from '../entities/user';
import { linearAPI } from '../network/api';
import store from './store';

export class SessionStore {
    // Variables
    active: boolean = false;
    user: User | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'store',
            properties: ['active'],
            storage: window.localStorage,
            expireIn: 24 * 60 * 60000, // 24h or on logout
            removeOnExpiration: true
        }).then(
            action((persistStore) => {
                console.log(persistStore.isHydrated ? 'session hydrated' : 'session failed to hydrate');
            })
        );
    }

    // Clear
    clear() {
        this.active = false;
        this.user = null;
        this.loading = false;
    }

    // API Methods
    login(usermame: string, password: string) {
        this.clear();
        this.loading = true;
        return linearAPI.post('/session/login', { username: usermame, password: password });
    }

    getUser() {
        return linearAPI.get('/session/');
    }

    logout() {
        store.Clear();
        linearAPI.get('/session/logout').then(() => {
            this.clear();
        });
    }

    setActive = (active: boolean) => (this.active = active);

    setLoading = (loading: boolean) => (this.loading = loading);

    setUser = (user: User) => (this.user = user);
}

export default new SessionStore();
