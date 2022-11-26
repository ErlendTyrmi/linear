import { makeAutoObservable } from 'mobx';

export class MessageStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    successes: string[] = [];
    infos: string[] = [];
    warnings: string[] = [];
    errors: string[] = [];

    // Clear
    Clear = () => {
        console.log('statusStore cleared');
        this.successes = [];
        this.infos = [];
        this.warnings = [];
        this.errors = [];
    };

    clearErrors = () => {
        this.errors = [];
    };
    clearInfo = () => {
        this.infos = [];
    };
    clearWarnings = () => {
        this.warnings = [];
    };
    clearSuccess = () => {
        this.successes = [];
    };

    addSuccess = (value: string) => this.successes.push(value);
    addInfo = (value: string) => this.infos.push(value);
    addWarning = (value: string) => this.warnings.push(value);
    addError = (value: string) => this.errors.push(value);

    lastSuccess = () => this.successes.at(-1) ?? '';
    lastInfo = () => this.infos.at(-1) ?? '';
    lastWarning = () => this.warnings.at(-1) ?? '';
    lastError = () => this.errors.at(-1) ?? '';
}

export default new MessageStore();
