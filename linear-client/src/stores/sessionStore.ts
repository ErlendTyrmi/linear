import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { useEffect } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { User } from '../entities/user';
import { linearAPI } from '../network/api';

export class SessionStore {
    // Variables
    user: User | null = null;
    loading: boolean = false;

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
                console.log(persistStore.isHydrated ? 'session hydrated' : 'session failed to hydrate');
            })
        );
    }

    // Clear
    clear() {
        //console.log('sessionStore cleared');
        this.user = null;
        this.loading = false;
    }

    // API Methods
    login(usermame: string, password: string) {
        this.clear();
        this.setLoading(true);
        return linearAPI.post('/session/login', { username: usermame, password: password });
    }

    logout() {
        this.clear();
        return linearAPI.get('/session/logout');
    }

    setLoading = (loading: boolean) => (this.loading = loading);

    setUser = (user: User) => (this.user = user);

    loadUser() {
        // TODO set user here insted of in component
        return linearAPI.get('/session');
    }
}

export default new SessionStore();
