// 2023-01-06T00:00:00+01:00
export const DateConverter = {
    getStringDate(date: Date): string {
        return (
            date.getFullYear() +
            '-' +
            this.padLeadingZero(date.getMonth() + 1) +
            '-' +
            this.padLeadingZero(date.getDate()) +
            'T' +
            this.padLeadingZero(date.getHours()) +
            ':' +
            this.padLeadingZero(date.getMinutes()) +
            ':' +
            this.padLeadingZero(date.getSeconds())
        );
    },

    padLeadingZero(number: number) {
        return number.toString().padStart(2, '0');
    }
};
