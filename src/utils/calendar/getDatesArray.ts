import {
    DATES_ARRAY_LOOP_GUARD_INDEX,
    daysOfWeek,
    FIRST_MONTH_DAY,
    LAST_ARRAY_ELEMENT_INDEX,
    PREVIOUS_MONTH_START_DATE_COEFFICIENT,
    START_INDEX,
} from '../../constants';
import { TDatesArray, TMonthData } from '../../types';
import { IDayItem } from '../../interfaces';
import { getCalendarRow } from './getCalendarRow';

export const getDatesArray = (monthData: TMonthData, yearAndMonth: { year: number; month: number }): TDatesArray => {
    const { firstDayOfMonth, lastDateOfCurrentMonth, lastDateOfPreviousMonth } = monthData;
    const previousMonthStartDate = lastDateOfPreviousMonth - firstDayOfMonth + PREVIOUS_MONTH_START_DATE_COEFFICIENT;

    const firstRow: IDayItem[] = getCalendarRow({
        firstValue: firstDayOfMonth === FIRST_MONTH_DAY ? firstDayOfMonth : previousMonthStartDate,
        limit: daysOfWeek.length,
        valueLimit: lastDateOfPreviousMonth,
        edgeMonthData: { hasPreviousMonthDays: firstDayOfMonth !== FIRST_MONTH_DAY },
        yearAndMonth,
    });

    let isNextMonth = false;
    let iteration = START_INDEX;
    const datesArray: TDatesArray = [firstRow];

    do {
        const lastRow = datesArray.at(LAST_ARRAY_ELEMENT_INDEX);
        const lastValue = lastRow.at(LAST_ARRAY_ELEMENT_INDEX);

        const hasNextMonthDays =
            lastRow.at(LAST_ARRAY_ELEMENT_INDEX).value + daysOfWeek.length >= lastDateOfCurrentMonth;

        const row: IDayItem[] = getCalendarRow({
            firstValue: lastValue.value + 1,
            limit: daysOfWeek.length,
            valueLimit: lastDateOfCurrentMonth,
            edgeMonthData: { hasNextMonthDays },
            yearAndMonth,
        });

        if (row.find((item) => item.value === lastDateOfCurrentMonth)) {
            isNextMonth = true;
        }

        datesArray.push(row);
        iteration += 1;
    } while (!isNextMonth || iteration > DATES_ARRAY_LOOP_GUARD_INDEX);

    return datesArray;
};
