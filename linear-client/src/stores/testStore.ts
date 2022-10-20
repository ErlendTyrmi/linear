
import { makeAutoObservable } from 'mobx';

import { linearAPI } from '../network/api';

export default class TestStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    data: any = [];

    // Clear
    clear = () => {
        //console.log('testStore cleared');
        this.setData('');
    };

    setData(data: string) {
        this.data = data;
    }
    getData = () => this.data;

    // API Methods
    getTest = () => {
        linearAPI.get('/order/all').then((response: any) => {
            console.log(response.data);
            console.log(response.status);

            if ((response.status as number) !== 200) {
                this.data = [];
            } else {
                this.setData(response.data);
            }
        });
    };
}
