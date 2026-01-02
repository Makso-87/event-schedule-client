import React from 'react';
import classes from './CalendarEventsList.module.scss';
import { IEvent } from '../../../interfaces';
import { getFormattedDate } from '../../../utils/calendar/getFormattedDate';
import { LONG_DASH, monthsMap } from '../../../constants';

export const CalendarEventsList = ({ date, events }: { date: Date; events: IEvent[] }) => {
    const [day, month, year] = date.toLocaleDateString().split('.');
    const title = `${day.replace(/(^0)/, '')} ${monthsMap[month]} ${year} года`;

    return (
        <div className={classes.CalendarEventsList}>
            <h2 className={classes.Title}>{title}</h2>

            <div>
                {events?.length ? (
                    events.map((event) => {
                        const { name, category, place, lent, url, startDate, endDate, startTime, endTime } = event;

                        const categoryStyle = { background: category.color };

                        return (
                            <div className={classes.CalendarEventsListItem} key={category.color}>
                                <h3 className={classes.EventName}>{name}</h3>

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
                                    <div className={`${classes.InfoTypeName} ${classes.MobileHide}`}>
                                        Дата проведения:
                                    </div>
                                    <div className={`${classes.InfoTypeName} ${classes.MobileShow}`}>Дата:</div>

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
                                        <a href={url} target='_blank'>
                                            {url}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h3 className={classes.NoEvents}>Нет событий</h3>
                )}
            </div>
        </div>
    );
};
