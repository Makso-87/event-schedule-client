import { getWeeksInMonth } from 'date-fns/getWeeksInMonth';
import { startOfMonth } from 'date-fns/startOfMonth';
import { isToday } from 'date-fns/isToday';
import { ICalendarRowItem, IEvent } from '../../interfaces';
import { SEVEN_DAY_OF_MONTH } from '../../constants';
import { getCalendarDayEvents } from './getCalendarDayEvents';

export const getDaysGrid = (date: Date, events: IEvent[]): ICalendarRowItem[][] => {
    const weeksInMonth = getWeeksInMonth(date, { weekStartsOn: 1 });
    const monthStart = startOfMonth(date);
    const startDay = monthStart.getDay();
    const totalDays = weeksInMonth * SEVEN_DAY_OF_MONTH;
    let daysInRowCounter = 0;
    const rows: ICalendarRowItem[][] = [[]];
    let rowsCount = 0;

    for (let i = 1; i <= totalDays; i += 1) {
        const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i - (startDay || SEVEN_DAY_OF_MONTH) + 1);

        // Проверяем, попадает ли текущий день в месяц
        const isCurrentMonth = currentDayDate.getMonth() === date.getMonth();
        const isPrevMonth = currentDayDate.getMonth() < date.getMonth();
        const isNextMonth = currentDayDate.getMonth() > date.getMonth();

        rows[rowsCount][daysInRowCounter] = {
            date: currentDayDate,
            value: currentDayDate.getDate(),
            isToday: isToday(currentDayDate),
            isNextMoth: isNextMonth,
            isPreviousMonth: isPrevMonth,
            inCurrentMonth: isCurrentMonth,
            events: getCalendarDayEvents(currentDayDate, events),
        };

        if (daysInRowCounter < SEVEN_DAY_OF_MONTH - 1) {
            daysInRowCounter += 1;
        } else {
            daysInRowCounter = 0;
            rowsCount += 1;
            rows.push([]);
        }
    }

    return rows;
};
