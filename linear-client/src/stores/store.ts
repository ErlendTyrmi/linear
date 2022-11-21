import sessionStore, { SessionStore } from './sessionStore';
import messageStore, { MessageStore } from './messageStore';
import orderStore, { OrderStore } from './orderStore';
import uiStore, { UiStore } from './uiStore';
import advertiserStore, { AdvertiserStore } from './advertiserStore';
import agencyStore, { AgencyStore } from './agencyStore';
import channelStore, { ChannelStore } from './channelStore';
import spotBookingStore, { SpotBookingStore } from './spotBookingStore';
import spotStore, { SpotStore } from './spotStore';
import bookingStore, { BookingStore } from './bookingStore';

export type RootStore = {
    // Session
    session: SessionStore;
    clear(): void;
    // Data
    advertiser: AdvertiserStore;
    booking: BookingStore;
    agency: AgencyStore;
    channel: ChannelStore;
    order: OrderStore;
    spotBooking: SpotBookingStore;
    spot: SpotStore;
    // UI
    message: MessageStore;
    ui: UiStore;
};

const store: RootStore = {
    // Session
    session: sessionStore,
    // Data
    advertiser: advertiserStore,
    booking: bookingStore,
    agency: agencyStore,
    channel: channelStore,
    order: orderStore,
    spotBooking: spotBookingStore,
    spot: spotStore,
    // UI
    message: messageStore,
    ui: uiStore,

    clear() {
        sessionStore.clear();
        advertiserStore.clear();
        bookingStore.clear();
        agencyStore.clear();
        orderStore.clear();
        spotBookingStore.clear();
        uiStore.clear();
    }
};

export default store;
