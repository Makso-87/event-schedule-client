import { IEvent } from '../../interfaces';
import { isSameDay } from 'date-fns';

export const getCalendarDayEvents = (date: Date, events: IEvent[]) => {
    const eventsFiltered = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        // return eventDate.getTime() === date.getTime();
        return isSameDay(eventDate, date);
    });

    return eventsFiltered;
};
