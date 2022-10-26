import { Axios, AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { Advertiser } from '../entities/advertiser';
import { User } from '../entities/user';

import { linearAPI } from '../network/api';
import store from './store';

export class AdvertiserStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    loading: boolean = false;
    data: Advertiser[] = [
        {
            id: '1',
            modifiedTime: new Date(),
            name: 'Advertiser 1',
            agency: 'id123'
        },
        {
            id: '2',
            modifiedTime: new Date(),
            name: 'Advertiser 2',
            agency: 'id123'
        },
        {
            id: '3',
            modifiedTime: new Date(),
            name: 'Advertiser 3',
            agency: 'id123'
        }
    ];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.data = [];
        this.selected = '';
    };

    setLoading = (loading: boolean) => (this.loading = loading);
    setData = (data: Advertiser[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    // API Methods
    getDataForUser = async (user: User) => {
        this.setLoading(true);

        // TODO: MAKE ADVERTISER BASED ON USER VIA AGENCY IN SERVER

        // linearAPI.getWithUserId('/advertiser/mine', user.id).then((response: AxiosResponse) => {
        //     this.setData(response.data);
        //     this.setLoading(false);
        // });
    };
}

export default new AdvertiserStore();
