import { IEvent } from '../../interfaces';
import { isSameDay } from 'date-fns';

export const getCalendarDayEvents = (date: Date, events: IEvent[]) => {
    return events.filter((event) => {
        const eventDate = new Date(event.startDate);
        return isSameDay(eventDate, date);
    });
};
