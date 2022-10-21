import { makeAutoObservable } from 'mobx';

export class MessageStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    messages: string[] = [];
    errors: string[] = [];

    // Clear
    clear = () => {
        console.log('statusStore cleared');
        this.messages = [];
        this.errors = [];
    };

    setError = (value: string) => this.errors.push(value);
    lastError = () => (this.errors.length > 0 ? this.errors.at(-1) : '');
    clearErrors = () => (this.errors = []);
}

export default new MessageStore();
