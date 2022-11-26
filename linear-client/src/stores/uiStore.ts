import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    mobileMenuOpen: boolean = false;

    // Clear
    clear = () => {
        this.loading = false;
        this.mobileMenuOpen = false;
    };

    // Setters
    setMobileMenuOpen(open: boolean) {
        this.mobileMenuOpen = open;
        console.log('menu open' + open);
    }
}

export default new UiStore();
