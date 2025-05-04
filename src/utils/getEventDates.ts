import { IEvent } from '../interfaces';
import { getSafeString } from './getSafeString';
import { getFormattedDate } from './calendar/getFormattedDate';

const getArrow = (string: string): string => {
    return !!string.length ? '→' : '';
};

const getStart = (event: IEvent): string => {
    return `${getSafeString(getFormattedDate(event.startDate))} ${getSafeString(event.startTime)}`;
};

const getEnd = (event: IEvent): string => {
    return `${getArrow(event.endDate)} ${getSafeString(getFormattedDate(event.endDate))} ${getSafeString(event.endTime)}`;
};

export const getEventDates = (event: IEvent): string => {
    const dates = `${getStart(event)} ${getEnd(event)}`;

    return dates.trim();
};
