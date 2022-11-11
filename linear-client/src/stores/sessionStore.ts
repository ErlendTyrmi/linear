import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
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
            name: 'session',
            properties: ['active'],
            storage: window.localStorage,
            expireIn: 48 * 60 * 60000, // 48h or on logout
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
    async login(usermame: string, password: string) {
        this.clear();
        this.setLoading(true);
        const response = await linearAPI.post('/session/login', { username: usermame, password: password });
        this.setUser(response.data);
    }

    async loadUser() {
        this.loading = true;
        const response = await linearAPI.get('/session/');
        this.setUser(response.data);
        this.setLoading(false);
    }

    async logout() {
        store.clear();
        linearAPI.get('/session/logout');
    }

    setActive = (active: boolean) => (this.active = active);

    setLoading = (loading: boolean) => (this.loading = loading);

    setUser = (user: User) => (this.user = user);
}

export default new SessionStore();
