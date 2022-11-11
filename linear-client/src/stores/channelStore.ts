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
    loading: boolean = false;
    data: Channel[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Channel[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    async loadChannels() {
        this.setLoading(true);
        const response = await linearAPI.get('/channel');
        this.setData(response.data);
        this.setLoading(false);
    }
}

export default new ChannelStore();
