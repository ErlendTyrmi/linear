import { makeAutoObservable, runInAction } from 'mobx';
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
        console.log('testStore cleared');
        this.setData('');
    };

    setData(data: string) {
        this.data = data;
    }
    getData = () => this.data;

    // API Methods
    getTest = () => {
        linearAPI.get('/landing').then((response: any) => {
            console.log(response.data);
            console.log(response.status);

            if ((response.status as number) !== 200) {
                this.data = 'No cookie';
            } else {
                this.setData(response.data[0].date.toString());
            }
        });
    };
}
