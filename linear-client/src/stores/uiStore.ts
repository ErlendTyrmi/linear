import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    menuOpen: boolean = true;
    mobileMenuOpen: boolean = false;

    // Clear
    clear = () => {
        this.menuOpen = true;
        this.mobileMenuOpen = false;
    };

    setMenuOpen = (value: boolean) => (this.menuOpen = value);
    setMobileMenuOpen = (value: boolean) => (this.mobileMenuOpen = value);
}

export default new UiStore();
