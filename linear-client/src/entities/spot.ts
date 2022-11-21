import { NonIndexRouteObject } from 'react-router-dom';

export interface Spot {
    id: string;
    modifiedTime: Date;
    startDateTime: Date;
    duration: number;
    bookedSeconds: number;
    channelId: string;
    channelName: string;
    nextProgram: string;
    priceTotal: number;
}

export interface SpotDTO {
    id: string;
    modifiedTime: Date;
    startDateTime: string;
    duration: number;
    bookedSeconds: number;
    channelId: string;
    channelName: string;
    nextProgram: string;
    priceTotal: number;
}
