import { IDayItem } from './interfaces';

export type TMonthData = {
    firstDayOfMonth: number;
    lastDateOfCurrentMonth: number;
    lastDateOfPreviousMonth: number;
};

export type TDatesArray = IDayItem[][];
