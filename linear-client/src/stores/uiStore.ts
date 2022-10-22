import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    menuOpen: boolean = true;

    // Clear
    clear = () => {
        this.menuOpen = true;
    };

    setMenuOpen = (value: boolean) => {
        this.menuOpen = value;
        console.log('Menu open: ' + this.menuOpen);
    };
}

export default new UiStore();
