import { SpotDTO, Spot } from '../entities/spot';
import { SpotBookingStore } from '../stores/spotBookingStore';
import { DateConverter } from './dateConverter';

export const SpotConverter = {
    convertDtotoSpot(dto: SpotDTO): Spot {
        const start = new Date(dto.startDateTime);

        let spot: Spot = {
            id: dto.id,
            modifiedTime: dto.modifiedTime,
            startDateTime: start,
            duration: dto.duration,
            bookedSeconds: dto.bookedSeconds,
            channelId: dto.channelId,
            channelName: dto.channelName,
            nextProgram: dto.nextProgram,
            priceTotal: dto.priceTotal
        };
        return spot;
    },

    convertSpotToDto(spot: Spot): SpotDTO {
        let date = DateConverter.getStringDate(spot.startDateTime);
        let dto: SpotDTO = {
            id: spot.id,
            modifiedTime: spot.modifiedTime,
            startDateTime: date,
            duration: spot.duration,
            bookedSeconds: spot.bookedSeconds,
            channelId: spot.channelId,
            channelName: spot.channelName,
            nextProgram: spot.nextProgram,
            priceTotal: spot.priceTotal
        };
        return dto;
    }
};
