import { FIRST_MONTH_DAY, START_INDEX } from '../../constants';
import { IDayItem, IGetDateData, IGetRow } from '../../interfaces';
import { getCalendarDateData } from './getCalendarDateData';
import { events } from '../../mockData';

export const getCalendarRow = ({ firstValue, limit, valueLimit, yearAndMonth, edgeMonthData }: IGetRow) => {
    const getDateDataArguments: IGetDateData = {
        day: firstValue,
        events,
        currentMonth: yearAndMonth.month,
        currentYear: yearAndMonth.year,
        inCurrentMonth: !edgeMonthData.hasPreviousMonthDays,
    };

    const row = [getCalendarDateData(getDateDataArguments)];

    for (let i = START_INDEX; i < limit - 1; i += 1) {
        if (row[i].value < valueLimit) {
            getDateDataArguments.day = row[i].value + 1;

            if (edgeMonthData.hasPreviousMonthDays) {
                getDateDataArguments.inCurrentMonth = getDateDataArguments.day < firstValue;
            } else if (edgeMonthData.hasNextMonthDays) {
                getDateDataArguments.inCurrentMonth = getDateDataArguments.day > firstValue;
            }

            if (!edgeMonthData.hasPreviousMonthDays && !edgeMonthData.hasNextMonthDays) {
                getDateDataArguments.inCurrentMonth = true;
            }

            const dayData: IDayItem = getCalendarDateData(getDateDataArguments);

            row.push(dayData);
        } else {
            getDateDataArguments.inCurrentMonth = edgeMonthData.hasPreviousMonthDays;
            getDateDataArguments.day = FIRST_MONTH_DAY;
            const dayData: IDayItem = getCalendarDateData(getDateDataArguments);

            row.push(dayData);
        }
    }

    return row;
};
