import { makeAutoObservable } from 'mobx';
import { Spot, SpotDTO } from '../entities/spot';
import { linearAPI } from '../network/api';
import { SpotConverter } from '../utility/spotConverter';

export class SpotStore {
    constructor() {
        makeAutoObservable(this);
    }

    // Variables
    isLoading: boolean = false;
    data: Spot[] = [];

    selected: string = '';

    // Clear
    clear = () => {
        this.setLoading(false);
        this.setData([]);
        this.setSelected('');
    };

    setLoading = (loading: boolean) => (this.isLoading = loading);
    setData = (data: Spot[]) => (this.data = data);
    setSelected(value: string) {
        this.selected = value;
    }

    getBySpotId(id: string): Spot | undefined {
        return this.data.find((it) => it.id === id);
    }

    // API Methods
    async loadSpots() {
        this.setLoading(true);
        const response = await linearAPI.get('/spot/');
        const spots: Spot[] = [];
        (response.data as SpotDTO[]).forEach((it) => {
            spots.push(SpotConverter.convertDtotoSpot(it));
        });
        this.setData(spots);
        this.setLoading(false);
    }
}

export default new SpotStore();
