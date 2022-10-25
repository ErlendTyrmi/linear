import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    sessionmenuOpen: boolean = false;

    // Clear
    clear = () => {
        this.sessionmenuOpen = false;
    };

    // Setters
    setSessionMenuOpen(open: boolean) {
        this.sessionmenuOpen = open;
    }
}

export default new UiStore();
