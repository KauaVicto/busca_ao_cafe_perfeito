

export class FormatDate {

    static removeUTC(date: Date) {

        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    }

}