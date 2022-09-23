import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import SessionStore from './sessionStore';
import StatusStore from './statusStore';
import TestStore from './testStore';

class Store {
    constructor() {
        makeAutoObservable(this);
        this.clear();
    }

    // Stores
    test = new TestStore();
    session = new SessionStore();
    status = new StatusStore();

    // Clear everything
    clear() {
        console.log('store cleared');
        this.test.clear();
        this.session.clear();
        this.status.clear();
    }
}

export default new Store();
