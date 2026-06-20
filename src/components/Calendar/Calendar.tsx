import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classes from './Calendar.module.scss';

import { ICalendarRowItem, IDayItem, IEvent } from '../../interfaces';
import { Day } from './Day/Day';
import { CalendarEventsList } from './CalendarEventsList/CalendarEventsList';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';
import { getNearestEvents } from '../../utils/calendar/getNearestEvents';
import { getDaysGrid } from '../../utils/calendar/getDaysGrid';
import { getDateData } from '../../utils/calendar/getDateData';
import { daysOfWeek, FIRST_MONTH_NUMBER, LAST_MONTH_NUMBER, months } from '../../constants';

export const Calendar = () => {
    const events = useAppSelector((state) => state.eventsList.events);

    const [currentDate, setCurrentDate] = useState(getDateData().date);
    const [daysGrid, setDaysGrid] = useState<ICalendarRowItem[][]>([]);
    const [selectedEvents, setSelectedEvents] = useState<IEvent[]>(null);
    const [selectedDay, setSelectedDay] = useState<IDayItem>(null);
    const [showNearestEvents, setShowNearestEvents] = useState<boolean>(false);
    const [cellHeight, setCellHeight] = useState<string>('');

    const tableRef = useRef<HTMLTableElement>(null);

    const getCellWidth = () => {
        const tableCell = tableRef.current?.querySelector('tr td');
        setCellHeight(`${tableCell?.clientWidth}px`);
    };

    useEffect(() => {
        getCellWidth();
        window.addEventListener('resize', getCellWidth);

        setDaysGrid(getDaysGrid(currentDate, events));

        if (events.length) {
            const nearestEvents = getNearestEvents(events);

            if (nearestEvents.length) {
                setSelectedEvents(nearestEvents);
                setSelectedDay({
                    date: new Date(nearestEvents[0].startDate),
                } as IDayItem);

                setShowNearestEvents(true);
            }
        }

        return () => {
            window.removeEventListener('resize', getCellWidth);
        };
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
            setShowNearestEvents(false);
        }
    };

    return (
        <div className={classes.CalendarTab}>
            <div className={classes.Calendar}>
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

                <table className={classes.CalendarGrid} ref={tableRef}>
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
                                                  <td key={key} style={{ height: cellHeight }}>
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

            {selectedEvents && (
                <CalendarEventsList
                    showNearestEvents={showNearestEvents}
                    date={selectedDay.date}
                    events={selectedEvents}
                />
            )}
        </div>
    );
};
