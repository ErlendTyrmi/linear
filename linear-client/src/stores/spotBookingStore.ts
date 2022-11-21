import { makeAutoObservable } from 'mobx';
import { appText } from '../assets/appText';
import { Spot } from '../entities/spot';
import { SpotBooking } from '../entities/spotBooking';
import { linearAPI } from '../network/api';
import store from './store';

interface SpotBookingSpot {
    spot: Spot;
    booking: SpotBooking;
}

export class SpotBookingStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    isLoading: boolean = false;
    data: SpotBooking[] = [];
    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.isLoading = loading);
    setData = (data: SpotBooking[]) => (this.data = data);
    setSelected = (value: string) => (this.selected = value);

    getSpotBookingsForCurrentOrder(): SpotBooking[] {
        let orderId = store.booking.currentOrderId;
        if (orderId != undefined) {
            return this.data.filter((it) => it.orderId === orderId);
        }

        return [];
    }

    // getSpotsForCurrentOrder(): Spot[] {
    //     let ids = this.getSpotBookingsForCurrentOrder().map((it) => it.spotId);
    //     return store.spot.data.filter((it) => ids.includes(it.id));
    // }

    // API Methods
    async loadSpotBookings() {
        this.setLoading(true);
        const response = await linearAPI.get('/spotbooking/own/');
        this.setData(response.data);
        this.setLoading(false);
    }

    async delete(booking: SpotBooking) {
        this.setLoading(true);
        await linearAPI.delete('/spotbooking/', booking);
        // Reload on delete
        await this.loadSpotBookings();
        await store.order.loadOrders(); // TODO: loadorder?
        store.message.addSuccess(appText.bookingSpotBookingDeleted());
        this.setLoading(false);
    }
}

export default new SpotBookingStore();
