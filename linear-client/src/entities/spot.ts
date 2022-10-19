export interface Spot {
    id: string;
    modifiedTime: Date;
    startDateTime: Date;
    duration: number;
    bookedSeconds: number;
    channelId: string;
    channelName: string;
    nextProgram: string;
    cpmPrice: string;
}
