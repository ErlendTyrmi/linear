import { makeAutoObservable } from 'mobx';
import { linearAPI } from '../network/api';

export default class TestStore {
    constructor() {
        makeAutoObservable(this);
        this.clear();
    }

    // Variables
    data: string = '';

    // Clear
    clear = () => {
        this.data = '';
    };

    // API Methods
    getTest = () => {
        linearAPI.get('/landing').then((response: any) => {
            console.log(response.status);
            console.log(response.data);
            if ((response.status as number) !== 200) {
                this.data = 'No cookie';
            } else {
                this.data = response.data[0].date.toString();
            }
        });
    };
}
