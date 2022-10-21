import sessionStore, { SessionStore } from './sessionStore';
import statusStore, { MessageStore } from './messageStore';
import testStore, { TestStore } from './testStore';
import uiStore, { UiStore } from './uiStore';

export type RootStore = {
    test: TestStore;
    session: SessionStore;
    message: MessageStore;
    ui: UiStore;
    clear(): void;
};

const store: RootStore = {
    test: testStore,
    session: sessionStore,
    message: statusStore,
    ui: uiStore,

    clear() {
        testStore.clear();
        sessionStore.clear();
        //statusStore.clear()
        uiStore.clear();
    }
};

export default store;
