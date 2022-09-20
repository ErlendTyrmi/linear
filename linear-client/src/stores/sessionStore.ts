import { makeAutoObservable } from 'mobx';
import { useEffect } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import { LinearUser } from '../entities/linearUser';
import { linearAPI } from '../network/api';
import store from './store';

export default class SessionStore {
    constructor() {
        makeAutoObservable(this);
        this.clear();
    }

    // Variables
    user: LinearUser | undefined = undefined;

    // Clear
    clear() {
        this.user = undefined;
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

    loadUser() {
        return linearAPI.get('/session/user');
    }
}
