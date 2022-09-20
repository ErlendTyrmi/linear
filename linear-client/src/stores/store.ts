import { makeAutoObservable } from 'mobx';
import SessionStore from './sessionStore';
import StatusStore from './statusStore';
import TestStore from './testStore';

class Store {
    constructor() {
        makeAutoObservable(this);
    }

    // Stores
    test = new TestStore();
    session = new SessionStore();
    status = new StatusStore();

    // Clear everything
    clear() {
        this.test.clear();
        this.session.clear();
        this.status.clear();
    }
}

export default new Store();
