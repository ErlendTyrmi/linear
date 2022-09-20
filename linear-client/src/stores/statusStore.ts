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

    // Clear
    clear = () => {
        this.status = LoadStatus.idle;
        this.messages = [];
        this.errors = [];
    };
}
