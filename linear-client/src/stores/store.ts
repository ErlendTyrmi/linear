import sessionStore, { SessionStore } from './sessionStore';
import statusStore, { StatusStore } from './statusStore';
import testStore, { TestStore } from './testStore';

export type RootStore = {
    testStore: TestStore;
    sessionStore: SessionStore;
    statusStore: StatusStore;
    clear(): void;
};

const rootStore: RootStore = {
    testStore,
    sessionStore,
    statusStore,

    clear() {
        testStore.clear();
        sessionStore.clear();
        //statusStore.clear()
    }
};

export default rootStore;
