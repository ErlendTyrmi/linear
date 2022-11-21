import { makeAutoObservable } from 'mobx';
import { Agency } from '../entities/agency';
import { linearAPI } from '../network/api';

export class AgencyStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    isLoading: boolean = false;
    data: Agency | null = null;

    default: string = '';

    // Clear
    clear = () => {
        this.setIsLoading(false);
        this.data = null;
        this.default = '';
    };

    setIsLoading = (loading: boolean) => (this.isLoading = loading);
    setData = (data: Agency) => (this.data = data);
    setDefault(value: string) {
        this.default = value;
    }

    // API Methods
    async loadAgency() {
        this.setIsLoading(true);
        const response = await linearAPI.get('/agency/');
        this.setData(response.data);
        this.setIsLoading(false);
    }
}

export default new AgencyStore();
