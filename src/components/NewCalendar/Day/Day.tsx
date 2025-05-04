import React from 'react';
import cn from 'classnames';
import classes from './Day.module.scss';
import { ICalendarRowItem, TColor } from '../../../interfaces';
import { getEventCategoryColors } from '../../../utils/calendar/getEventCategoryColors';
import { categories } from '../../../mockData';
import { getEventCategoryColorsMap } from '../../../utils/calendar/getEventCategoryColorsMap';
import { getEventsCSSGradients } from '../../../utils/calendar/getEventsCSSGradients';

export const Day = ({ data, callback }: { data: ICalendarRowItem; callback: () => void }) => {
    const classList = cn(classes.Day, {
        [classes.Today]: data.isToday && data.inCurrentMonth,
        [classes.Disabled]: !data.inCurrentMonth,
        [classes.HasEvent]: data.events.length && data.inCurrentMonth,
    });

    const eventCategoryColorsMap = getEventCategoryColorsMap(categories);
    const eventCategoryColors = getEventCategoryColors(data.events, eventCategoryColorsMap);
    const colorValues: TColor[] = Object.values(eventCategoryColors);
    const gradients = getEventsCSSGradients(colorValues);

    const style = {
        background: colorValues.length === 1 ? colorValues[0].color : `conic-gradient(${gradients.string.slice(2)})`,
    };

    const args = {
        onClick: callback,
        className: classList,
        [colorValues.length && data.inCurrentMonth && 'style']: style,
    };

    return <div {...args}>{data.value}</div>;
};
