import sessionStore, { SessionStore } from './sessionStore';
import statusStore, { MessageStore } from './messageStore';
import testStore, { TestStore } from './testStore';
import uiStore, { UiStore } from './uiStore';
import advertiserStore, { AdvertiserStore } from './advertiserStore';

export type RootStore = {
    session: SessionStore;
    advertiser: AdvertiserStore;

    test: TestStore;

    message: MessageStore;
    ui: UiStore;
    clear(): void;
};

const store: RootStore = {
    session: sessionStore,
    advertiser: advertiserStore,
    test: testStore,

    message: statusStore,
    ui: uiStore,

    clear() {
        testStore.clear();
        advertiserStore.clear();
        sessionStore.clear();
        uiStore.clear();
    }
};

export default store;
