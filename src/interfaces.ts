import { PropsWithChildren, ReactNode } from 'react';

export interface ICategory {
    id: string;
    name: string;
    color: string;
    description: string;
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
    category: ICategory;
}

export interface IDayItem {
    date: Date;
    value: number;
    isToday: boolean;
    isActive?: boolean;
    inCurrentMonth?: boolean;
    events: IEvent[];
}

export interface ICategoriesState {
    categories: ICategory[];
}

export interface IEventsState {
    events: IEvent[];
}

export interface ICalendarRowItem extends IDayItem {
    isPreviousMonth: boolean;
    isNextMoth: boolean;
}

export type TColor = {
    color: string;
};

export type TEventCategoryColors = {
    [key: string]: TColor;
};

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
