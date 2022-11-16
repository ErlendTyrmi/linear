import { convertRoutesToDataRoutes } from '@remix-run/router/dist/utils';

export interface Order {
    id: string;
    modifiedTime: Date;
    ordernumber: string;
    advertiserId: string;
    advertiserName: string;
    advertiserProductName: string;
    handlerId: string;
    startDate: Date;
    endDate: Date;
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

// DTO to handle C# datetimes
export interface OrderDTO {
    id: string;
    modifiedTime: Date;
    ordernumber: string;
    advertiserId: string;
    advertiserName: string;
    advertiserProductName: string;
    handlerId: string;
    startDate: string;
    endDate: string;
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
