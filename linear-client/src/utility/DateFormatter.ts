import { appText } from '../assets/appText';

export const DateFormatter = {
    prettyDateWithTime(date: Date | undefined) {
        if (date !== undefined) {
            return [date.toLocaleString('da-DK', { dateStyle: 'full' }), date.toLocaleString('da-DK', { hour: '2-digit', minute: '2-digit', second: '2-digit' })].join(' ');
        } else return '';
    }
};
