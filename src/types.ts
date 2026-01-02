import { IDayItem } from './interfaces';

export type TGraphQLResponse = {
    data: Record<string, unknown | null>;
    errors: Error[];
};

export type TMonthData = {
    firstDayOfMonth: number;
    lastDateOfCurrentMonth: number;
    lastDateOfPreviousMonth: number;
};

export type TDatesArray = IDayItem[][];
