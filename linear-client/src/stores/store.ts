import sessionStore, { SessionStore } from './sessionStore';
import messageStore, { MessageStore } from './messageStore';
import orderStore, { OrderStore } from './orderStore';
import uiStore, { UiStore } from './uiStore';
import advertiserStore, { AdvertiserStore } from './advertiserStore';
import agencyStore, { AgencyStore } from './agencyStore';
import channelStore, { ChannelStore } from './channelStore';
import salesProductStore, { SalesProductStore } from './salesProductStore';
import spotBookingStore, { SpotBookingStore } from './spotBookingStore';
import spotStore, { SpotStore } from './spotStore';

export type RootStore = {
    // Session
    session: SessionStore;
    clear(): void;
    // Data
    advertiser: AdvertiserStore;
    agency: AgencyStore;
    channel: ChannelStore;
    order: OrderStore;
    salesProduct: SalesProductStore;
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
    agency: agencyStore,
    channel: channelStore,
    order: orderStore,
    salesProduct: salesProductStore,
    spotBooking: spotBookingStore,
    spot: spotStore,
    // UI
    message: messageStore,
    ui: uiStore,

    clear() {
        sessionStore.clear();
        advertiserStore.clear();
        agencyStore.clear();
        orderStore.clear();
        spotBookingStore.clear();
        uiStore.clear();
    }
};

export default store;
