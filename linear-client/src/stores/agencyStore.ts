import { makeAutoObservable } from 'mobx';
import { Agency } from '../entities/agency';
import { linearAPI } from '../network/api';

export class AgencyStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Agency | null = null;

    default: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.data = null;
        this.default = '';
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Agency) => (this.data = data);
    setDefault(value: string) {
        this.default = value;
    }

    // API Methods
    async loadAgency() {
        this.setLoading(true);
        const response = await linearAPI.get('/agency/');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new AgencyStore();
