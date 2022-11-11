import { makeAutoObservable } from 'mobx';

// TODO: Use or lose this!!!
export class UiStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;

    // Clear
    clear = () => {
        this.loading = false;
    };

    // Setters
    setSessionMenuOpen(open: boolean) {
        this.loading = open;
    }
}

export default new UiStore();
