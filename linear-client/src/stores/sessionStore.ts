import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { useEffect } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { LinearUser } from '../entities/linearUser';
import { linearAPI } from '../network/api';
import store from './store';

export default class SessionStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'store',
            properties: ['user'],
            storage: window.localStorage,
            expireIn: 30 * 60000, // 30 minutes
            removeOnExpiration: true
        }).then(
            action((persistStore) => {
                console.log(persistStore.isHydrated ? 'hydrated' : 'failed to hydrate');
            })
        );
    }

    // Variables
    user: LinearUser | null = null;

    // Clear
    clear() {
        console.log('sessionStore cleared');
        this.user = null;
        console.log(this.user);
    }

    // API Methods
    login() {
        store.clear();
        return linearAPI.get('/session/login');
    }

    logout() {
        store.clear();
        return linearAPI.get('/session/logout');
    }

    setUser(user: LinearUser) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    loadUser() {
        return linearAPI.get('/session/user');
    }
}
