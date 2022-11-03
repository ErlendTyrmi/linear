import { makeAutoObservable } from 'mobx';
import { Spot } from '../entities/spot';
import { linearAPI } from '../network/api';

export class SpotStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Spot[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Spot[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    async getSpots() {
        this.setLoading(true);
        const response = await linearAPI.get('/spot');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new SpotStore();
