import { PropsWithChildren, ReactNode } from 'react';
import { ELimitType } from './enums';

export interface ICategory {
    id: string;
    name: string;
    color: string;
}

export interface IEvent {
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    place: string;
    url: string;
    lent: string;
    categoryId: string;
}

export interface IDayItem {
    value: number;
    isToday: boolean;
    inCurrentMonth?: boolean;
    events: IEvent[];
}

export interface IGetDateData {
    day: number;
    currentMonth: number;
    currentYear: number;
    events: IEvent[];
    inCurrentMonth?: boolean;
}

export interface IGetRow {
    firstValue: number;
    limit: number;
    valueLimit: number;
    edgeMonthData: {
        hasPreviousMonthDays?: boolean;
        hasNextMonthDays?: boolean;
    };
    yearAndMonth: {
        year: number;
        month: number;
    };
}

export interface ISiteWrapper extends PropsWithChildren {
    children?: ReactNode;
}
