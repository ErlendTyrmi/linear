import { makeAutoObservable } from 'mobx';

export enum LoadStatus {
    idle,
    loading,
    done
}

export default class StatusStore {
    constructor() {
        makeAutoObservable(this);
        console.log('statusstore is created');
    }

    // Variables
    loading: boolean = false;
    messages: string[] = [];
    lastError: string | null = null;
    loginError: boolean = false;

    // Clear
    clear = () => {
        console.log('statusStore cleared');
        this.loading = false;
        this.messages = [];
        this.lastError = null;
        this.loginError = false;
    };

    setLoading = (value: boolean) => (this.loading = value);
    setLastError = (value: string | null) => (this.lastError = value);
    setIsLoginError = (value: boolean) => (this.loginError = value);
}
