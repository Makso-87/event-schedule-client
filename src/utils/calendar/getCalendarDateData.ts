import { IDayItem, IGetDateData } from '../../interfaces';
import { getCalendarDayEvents } from './getCalendarDayEvents';
import { isToday } from 'date-fns';

export const getCalendarDateData = ({
    day,
    currentMonth,
    currentYear,
    events,
    inCurrentMonth = false,
}: IGetDateData): IDayItem => {
    const dayDate = new Date(currentYear, currentMonth, day);

    return {
        value: day,
        isToday: isToday(dayDate),
        events: inCurrentMonth ? getCalendarDayEvents(dayDate, events) : [],
        inCurrentMonth,
    };
};
