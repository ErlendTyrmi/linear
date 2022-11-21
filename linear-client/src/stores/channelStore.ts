import { action, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Channel } from '../entities/channel';
import { linearAPI } from '../network/api';

export class ChannelStore {
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'channels',
            properties: ['data'],
            storage: window.localStorage,
            expireIn: 48 * 60 * 60000, // 48h or on logout
            removeOnExpiration: true
        }).then(
            action((persistStore) => {
                console.log(persistStore.isHydrated ? 'channels hydrated' : 'channels failed to hydrate');
            })
        );
    }

    // Variables
    isLoading: boolean = false;
    data: Channel[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setIsLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setIsLoading = (loading: boolean) => (this.isLoading = loading);
    setData = (data: Channel[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    async loadChannels() {
        this.setIsLoading(true);
        const response = await linearAPI.get('/channel/');
        this.setData(response.data);
        this.setIsLoading(false);
    }
}

export default new ChannelStore();
