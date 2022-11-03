import { makeAutoObservable } from 'mobx';
import { SpotBooking } from '../entities/spotBooking';
import { linearAPI } from '../network/api';

export class SpotBookingStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: SpotBooking[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: SpotBooking[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    async getSpotBookings() {
        this.setLoading(true);
        const response = await linearAPI.get('/spotbooking/own');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new SpotBookingStore();
