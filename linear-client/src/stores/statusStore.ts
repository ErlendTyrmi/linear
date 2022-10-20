import { makeAutoObservable } from 'mobx';

export class StatusStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    messages: string[] = [];
    errors: string[] = [];

    // Clear
    clear = () => {
        console.log('statusStore cleared');
        this.loading = false;
        this.messages = [];
        this.errors = [];
    };

    setLoading = (value: boolean) => {
        this.loading = value;
        console.log('loading: ' + this.loading);
    };
    setError = (value: string) => this.errors.push(value);
    lastError = () => (this.errors.length > 0 ? this.errors.at(-1) : '');
    clearErrors = () => (this.errors = []);
}

export default new StatusStore();
