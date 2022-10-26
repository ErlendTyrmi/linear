import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    something: boolean = false;

    // Clear
    clear = () => {
        this.something = false;
    };

    // Setters
    setSessionMenuOpen(open: boolean) {
        this.something = open;
    }
}

export default new UiStore();
