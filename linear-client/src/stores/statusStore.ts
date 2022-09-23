import { makeAutoObservable } from 'mobx';

enum LoadStatus {
    error,
    success,
    loading,
    idle
}

export default class StatusStore {
    constructor() {
        makeAutoObservable(this);
        this.clear();
    }

    // Variables
    status: LoadStatus = LoadStatus.idle;
    messages: string[] = [];
    errors: string[] = [];
    loginError: boolean = false;

    // Clear
    clear = () => {
        console.log('statusStore cleared');
        this.status = LoadStatus.idle;
        this.messages = [];
        this.errors = [];
        this.loginError = false;
    };
}
