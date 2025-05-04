import React, { MouseEventHandler, useState } from 'react';
import classes from './NewCalendar.module.scss';

import { ICalendarRowItem, IEvent } from '../../interfaces';
import { getWeeksInMonth } from 'date-fns/getWeeksInMonth';
import { daysOfWeek, FIRST_MONTH_NUMBER, LAST_MONTH_NUMBER, months, SEVEN_DAY_OF_MONTH } from '../../constants';
import { startOfMonth } from 'date-fns/startOfMonth';
import { isToday } from 'date-fns/isToday';
import { getCalendarDayEvents } from '../../utils/calendar/getCalendarDayEvents';
import { events } from '../../mockData';
import { Day } from './Day/Day';
import { CalendarEventsList } from './CalendarEventsList/CalendarEventsList';

const getDateData = (date: string | number | Date = new Date()) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();
    const weekDay = dateObject.getDay();

    return {
        year,
        month,
        day,
        weekDay,
        date: dateObject,
    };
};

const getDaysGrid = (date: Date): ICalendarRowItem[][] => {
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

export const NewCalendar = () => {
    const [currentDate, setCurrentDate] = useState(getDateData().date);
    const [daysGrid, setDaysGrid] = useState(getDaysGrid(currentDate));
    const [selectedEvents, setSelectedEvents] = useState<IEvent[]>(null);

    const onClickNextMonthButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        let newCurrentDate;

        if (currentMonth < LAST_MONTH_NUMBER) {
            newCurrentDate = new Date(currentYear, currentMonth + 1);
        } else {
            newCurrentDate = new Date(currentYear + 1, FIRST_MONTH_NUMBER);
        }

        setCurrentDate(newCurrentDate);
        setDaysGrid(getDaysGrid(newCurrentDate));
    };

    const onClickPrevMothButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        let newCurrentDate;

        if (currentMonth > FIRST_MONTH_NUMBER) {
            newCurrentDate = new Date(currentYear, currentMonth - 1);
        } else {
            newCurrentDate = new Date(currentYear - 1, LAST_MONTH_NUMBER);
        }

        setCurrentDate(newCurrentDate);
        setDaysGrid(getDaysGrid(newCurrentDate));
    };

    const onClickMonthDay = (events: IEvent[]) => {
        setSelectedEvents(events);
    };

    return (
        <div className={classes.CalendarTab}>
            <div className={classes.NewCalendar}>
                <div className={classes.CalendarTop}>
                    <button onClick={onClickPrevMothButton} className={classes.ButtonPrev} id='btnPrev' type='button' />

                    <div className={classes.MonthName}>
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>

                    <button
                        onClick={onClickNextMonthButton}
                        className={classes.ButtonNext}
                        id='btnNext'
                        type='button'
                    />
                </div>

                <table className={classes.CalendarGrid}>
                    <tr>
                        {daysOfWeek.map((day) => {
                            return (
                                <th>
                                    <div className={classes.WeekDay}>{day}</div>
                                </th>
                            );
                        })}
                    </tr>

                    {daysGrid.length
                        ? daysGrid.map((dayRow) => {
                              return (
                                  <tr>
                                      {dayRow.map((day) => {
                                          return (
                                              <td>
                                                  <Day data={day} callback={() => onClickMonthDay(day.events)} />
                                              </td>
                                          );
                                      })}
                                  </tr>
                              );
                          })
                        : null}
                </table>
            </div>

            {selectedEvents && <CalendarEventsList events={selectedEvents} />}
        </div>
    );
};
