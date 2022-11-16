import { OrderDTO, Order } from '../entities/order';
import { DateConverter } from './dateConverter';

export const OrderConverters = {
    convertOrderFromDto(dto: OrderDTO): Order {
        const start = new Date(dto.startDate);
        const end = new Date(dto.endDate);
        const newOrder: Order = {
            id: dto.id,
            modifiedTime: dto.modifiedTime,
            ordernumber: dto.ordernumber,
            advertiserId: dto.advertiserId,
            advertiserName: dto.advertiserName,
            advertiserProductName: dto.advertiserProductName,
            handlerId: dto.handlerId,
            startDate: start,
            endDate: end,
            orderTypeName: dto.orderTypeName,
            channelId: dto.channelId,
            salesProductId: dto.salesProductId,
            salesProductName: dto.salesProductName,
            salesGroupNumber: dto.salesGroupNumber,
            durationSeconds: dto.durationSeconds,
            costPerMille: dto.costPerMille,
            viewsExpectedMille: dto.viewsExpectedMille,
            viewsDeliveredMille: dto.viewsDeliveredMille,
            orderStatus: dto.orderStatus,
            orderBudget: dto.orderBudget,
            orderTotal: dto.orderTotal
        };

        return newOrder;
    },

    convertOrderToDto(order: Order): OrderDTO {
        const start = DateConverter.getStringDate(order.startDate);
        const end = DateConverter.getStringDate(order.endDate);

        const newDto: OrderDTO = {
            id: order.id,
            modifiedTime: order.modifiedTime,
            ordernumber: order.ordernumber,
            advertiserId: order.advertiserId,
            advertiserName: order.advertiserName,
            advertiserProductName: order.advertiserProductName,
            handlerId: order.handlerId,
            startDate: start,
            endDate: end,
            orderTypeName: order.orderTypeName,
            channelId: order.channelId,
            salesProductId: order.salesProductId,
            salesProductName: order.salesProductName,
            salesGroupNumber: order.salesGroupNumber,
            durationSeconds: order.durationSeconds,
            costPerMille: order.costPerMille,
            viewsExpectedMille: order.viewsExpectedMille,
            viewsDeliveredMille: order.viewsDeliveredMille,
            orderStatus: order.orderStatus,
            orderBudget: order.orderBudget,
            orderTotal: order.orderTotal
        };

        return newDto;
    }
};
