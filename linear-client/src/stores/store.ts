import sessionStore, { SessionStore } from './sessionStore';
import messageStore, { MessageStore } from './messageStore';
import orderStore, { OrderStore } from './orderStore';
import uiStore, { UiStore } from './uiStore';
import advertiserStore, { AdvertiserStore } from './advertiserStore';

export type RootStore = {
    // Session
    session: SessionStore;
    Clear(): void;
    // Data
    advertiser: AdvertiserStore;
    order: OrderStore;
    // UI
    message: MessageStore;
    ui: UiStore;
};

const store: RootStore = {
    session: sessionStore,
    advertiser: advertiserStore,
    order: orderStore,
    message: messageStore,
    ui: uiStore,

    Clear() {
        orderStore.clear();
        advertiserStore.clear();
        sessionStore.clear();
        uiStore.clear();
    }
};

export default store;
