import React, { MouseEventHandler, useEffect, useState } from 'react';
import classes from './NewCalendar.module.scss';

import { ICalendarRowItem, IDayItem, IEvent } from '../../interfaces';
import { Day } from './Day/Day';
import { CalendarEventsList } from './CalendarEventsList/CalendarEventsList';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { getNearestEvents } from '../../utils/calendar/getNearestEvents';
import { getDaysGrid } from '../../utils/calendar/getDaysGrid';
import { getDateData } from '../../utils/calendar/getDateData';
import { daysOfWeek, FIRST_MONTH_NUMBER, LAST_MONTH_NUMBER, months } from '../../constants';

export const NewCalendar = () => {
    const events = useAppSelector((state) => state.eventsList.events);

    const [currentDate, setCurrentDate] = useState(getDateData().date);
    const [daysGrid, setDaysGrid] = useState<ICalendarRowItem[][]>([]);
    const [selectedEvents, setSelectedEvents] = useState<IEvent[]>(null);
    const [selectedDay, setSelectedDay] = useState<IDayItem>(null);

    useEffect(() => {
        setDaysGrid(getDaysGrid(currentDate, events));
    }, [events]);

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
        setDaysGrid(getDaysGrid(newCurrentDate, events));
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
        setDaysGrid(getDaysGrid(newCurrentDate, events));
    };

    const onClickMonthDay = (day: IDayItem) => {
        if (day.inCurrentMonth) {
            setSelectedDay(day);
            setSelectedEvents(day.events);
        }
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
                    <thead>
                        <tr>
                            {daysOfWeek.map((day) => {
                                return (
                                    <th key={day}>
                                        <div className={classes.WeekDay}>{day}</div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {daysGrid.length
                            ? daysGrid.map((dayRow, index) => {
                                  return (
                                      <tr key={index + Math.random()}>
                                          {dayRow.map((day) => {
                                              const key = `${day.value}-${day.events.reduce((acc, event) => {
                                                  return `${acc}-${event.category.id}`;
                                              }, '')}`;

                                              const data = {
                                                  ...day,
                                                  isActive: day.date === selectedDay?.date,
                                              };

                                              return (
                                                  <td key={key}>
                                                      <Day data={data} callback={() => onClickMonthDay(day)} />
                                                  </td>
                                              );
                                          })}
                                      </tr>
                                  );
                              })
                            : null}
                    </tbody>
                </table>
            </div>

            {selectedEvents && <CalendarEventsList date={selectedDay.date} events={selectedEvents} />}
        </div>
    );
};
