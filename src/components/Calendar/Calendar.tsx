import React, { MouseEventHandler, useEffect, useState } from 'react';
import cn from 'classnames';

import classes from './Calendar.module.scss';
import { TDatesArray, TMonthData } from '../../types';
import {
    daysOfWeek,
    FIRST_MONTH_NUMBER,
    LAST_MONTH_NUMBER,
    LONG_DASH,
    months,
    SEVEN_DAY_OF_MONTH,
} from '../../constants';
import { getDatesArray } from '../../utils/calendar/getDatesArray';
import { ICategory, IEvent } from '../../interfaces';
import { categories } from '../../mockData';
import { getFormattedDate } from '../../utils/calendar/getFormattedDate';
import chevronLeft from '../../images/icons/chevron_left.svg';
import chevronRight from '../../images/icons/chevron_right.svg';

const sortEventByCategory = (events: IEvent[]) => {
    const eventByCategories: Record<string, IEvent[]> = {};

    events.forEach((eventItem) => {
        if (eventByCategories[eventItem.categoryId]) {
            eventByCategories[eventItem.categoryId].push(eventItem);
        } else {
            eventByCategories[eventItem.categoryId] = [eventItem];
        }
    });

    return events;
};

export type TEventCategoryColors = {
    [key: string]: {
        color: string;
    };
};

const getEventCategoryColorsMap = (category: ICategory[]): Record<string, string> => {
    const eventCategoryColors: Record<string, string> = {};

    category.forEach((category) => {
        if (!eventCategoryColors[category.id]) {
            eventCategoryColors[category.id] = category.color;
        }
    });

    return eventCategoryColors;
};

const getEventCategoryColors = (events: IEvent[], categoryMap: Record<string, string>): TEventCategoryColors => {
    const eventCategoryColors: TEventCategoryColors = {};

    events.forEach((eventItem) => {
        if (!eventCategoryColors[eventItem.categoryId]) {
            eventCategoryColors[eventItem.categoryId] = {
                color: categoryMap[eventItem.categoryId],
            };
        }
    });

    return eventCategoryColors;
};

export const Calendar = () => {
    const date = new Date();
    const today = date.getDate();
    const [currentMonth, setCurrentMonth] = useState(date.getMonth());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [datesArray, setDatesArray] = useState<TDatesArray>([]);
    const [selectedEvent, setSelectedEvent] = useState<IEvent[]>(null);

    const eventCategoryColorsMap = getEventCategoryColorsMap(categories);

    const getMonthData = (year: number, monthIndex: number): TMonthData => {
        // Первый день недели в выбранном месяце
        const firstDayOfMonth = new Date(year, monthIndex, SEVEN_DAY_OF_MONTH).getDay() + 1;
        // Последний день выбранного месяца
        const lastDateOfCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();
        // Последний день предыдущего месяца
        const lastDateOfPreviousMonth =
            monthIndex == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, monthIndex, 0).getDate();

        return {
            firstDayOfMonth,
            lastDateOfCurrentMonth,
            lastDateOfPreviousMonth,
        };
    };

    const changeCalendarData = () => {
        const d = getDatesArray(getMonthData(currentYear, currentMonth), {
            year: currentYear,
            month: currentMonth,
        });

        setDatesArray(
            getDatesArray(getMonthData(currentYear, currentMonth), {
                year: currentYear,
                month: currentMonth,
            }),
        );
    };

    const onClickNextMonthButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        if (currentMonth < LAST_MONTH_NUMBER) {
            setCurrentMonth(currentMonth + 1);
        } else {
            setCurrentMonth(FIRST_MONTH_NUMBER);
            setCurrentYear(currentYear + 1);
        }
    };

    const onClickPrevMothButton: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        if (currentMonth > FIRST_MONTH_NUMBER) {
            setCurrentMonth(currentMonth - 1);
        } else {
            setCurrentMonth(LAST_MONTH_NUMBER);
            setCurrentYear(currentYear - 1);
        }
    };

    const onClickMonthDay = (events: IEvent[]) => {
        setSelectedEvent(events);
    };

    useEffect(() => {
        changeCalendarData();
    }, [currentMonth]);

    return (
        <div className={classes.CalendarTab}>
            <div className={classes.Calendar}>
                <div className={classes.CalendarTop}>
                    <button onClick={onClickPrevMothButton} className={classes.ButtonPrev} id='btnPrev' type='button' />

                    <div className={classes.MonthName}>
                        {months[currentMonth]} {currentYear}
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

                    {datesArray.length
                        ? datesArray.map((row, i) => {
                              return (
                                  <tr key={i}>
                                      {row.length
                                          ? row.map((dayItem) => {
                                                const classList = cn(classes.Day, {
                                                    [classes.Today]: dayItem.isToday,
                                                    [classes.NotCurrent]: !dayItem.inCurrentMonth,
                                                    [classes.HasEvent]: dayItem.events.length,
                                                });

                                                const eventCategoryColors = getEventCategoryColors(
                                                    dayItem.events,
                                                    eventCategoryColorsMap,
                                                );

                                                const colorValues = Object.values(eventCategoryColors);

                                                const getAngles = (prevDeg: number, currentDeg: number) => {
                                                    if (prevDeg) {
                                                        return `${prevDeg}deg ${currentDeg}deg`;
                                                    }

                                                    return `${currentDeg}deg`;
                                                };

                                                const gradients = colorValues.reduce(
                                                    (acc, { color }, index, array) => {
                                                        const angle = (360 / array.length) * (index + 1);
                                                        acc.string = `${acc.string}, ${color} ${getAngles(acc.deg, angle)}`;
                                                        acc.deg = angle;
                                                        return acc;
                                                    },
                                                    { deg: 0, string: '' },
                                                );

                                                const style = {
                                                    background:
                                                        colorValues.length === 1
                                                            ? colorValues[0].color
                                                            : `conic-gradient(${gradients.string.slice(2)})`,
                                                };

                                                const args = {
                                                    onClick: () => onClickMonthDay(dayItem.events),
                                                    className: classList,
                                                    [colorValues.length && 'style']: style,
                                                };

                                                return (
                                                    <td key={dayItem.value}>
                                                        <div {...args}>
                                                            {/*{Object.values(eventCategoryColors).map(*/}
                                                            {/*    ({ color }, index, array) => {*/}
                                                            {/*        const degree = (360 / array.length) * index;*/}
                                                            {/*        `linear-gradient(126deg, transparent 50%, white 50%),`;*/}

                                                            {/*        const style: Record<string, string> = {*/}
                                                            {/*            background: color,*/}
                                                            {/*            transform: `rotate(${degree}deg)`,*/}
                                                            {/*        };*/}

                                                            {/*        if (array.length === 1) {*/}
                                                            {/*            style.top = '0';*/}
                                                            {/*            style.left = '0';*/}
                                                            {/*        }*/}

                                                            {/*        return (*/}
                                                            {/*            <div*/}
                                                            {/*                className={classes.ColorBack}*/}
                                                            {/*                style={style}*/}
                                                            {/*            ></div>*/}
                                                            {/*        );*/}
                                                            {/*    },*/}
                                                            {/*)}*/}
                                                            <span className={classes.Text}>{dayItem.value}</span>
                                                        </div>
                                                    </td>
                                                );
                                            })
                                          : null}
                                  </tr>
                              );
                          })
                        : null}
                </table>
            </div>

            <div className={classes.CalendarEventsList}>
                {selectedEvent
                    ? selectedEvent.map((eventItem) => {
                          const { name, categoryId, place, lent, url, startDate, endDate, startTime, endTime } =
                              eventItem;

                          const category = categories.find((categoryItem) => categoryItem.id === categoryId);
                          const categoryStyle = { background: category.color };

                          return (
                              <div className={classes.CalendarEventsListItem}>
                                  <div className={classes.EventName}>{name}</div>

                                  <div className={classes.InfoContainer}>
                                      <div className={classes.InfoTypeName}>Категория:</div>
                                      <div className={classes.EventCategory} style={categoryStyle}>
                                          {category.name}
                                      </div>
                                  </div>

                                  <div className={classes.InfoContainer}>
                                      <div className={classes.InfoTypeName}>Место проведения:</div>
                                      <div className={classes.EventPlace}>{place}</div>
                                  </div>

                                  <div className={classes.InfoContainer}>
                                      <div className={classes.InfoTypeName}>Дата проведения:</div>
                                      <div className={classes.EventDate}>
                                          <div className={classes.DateItem}>
                                              <div className={classes.Date}>{getFormattedDate(startDate)}</div>
                                              {startTime ? <div className={classes.Time}>, {startTime}</div> : null}
                                          </div>

                                          {endDate || endTime ? (
                                              <span dangerouslySetInnerHTML={{ __html: LONG_DASH }} />
                                          ) : null}

                                          <div className={classes.DateItem}>
                                              <div className={classes.Date}>{getFormattedDate(endDate)}</div>
                                              {endTime ? <div className={classes.Time}>, {endTime}</div> : null}
                                          </div>
                                      </div>
                                  </div>

                                  {lent ? (
                                      <div className={classes.InfoContainer}>
                                          <div className={classes.InfoTypeName}>Пост:</div>
                                          <div className={classes.EventLent}></div>
                                      </div>
                                  ) : null}

                                  <div className={classes.InfoContainer}>
                                      <div className={classes.InfoTypeName}>Подробнее:</div>
                                      <div className={classes.EventLink}>
                                          <a href={url}>{url}</a>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};
