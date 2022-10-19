export interface Order {
    id: string;
    modifiedTime: Date;
    ordernumber: string;
    advertiserId: string;
    advertiserName: string;
    advertiserProductName: string;
    handlerId: string;
    startWeek: number;
    endWeek: number;
    orderTypeName: string;
    channelId: string;
    salesProductId: string;
    salesProductName: string;
    salesGroupNumber?: any;
    durationSeconds: number;
    costPerMille: number;
    viewsExpectedMille: number;
    viewsDeliveredMille: number;
    orderStatus: string;
    orderBudget: number;
    orderTotal: number;
}
