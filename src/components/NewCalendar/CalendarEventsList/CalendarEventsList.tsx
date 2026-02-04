import React from 'react';
import classes from './CalendarEventsList.module.scss';
import { IEvent } from '../../../interfaces';
import { LONG_DASH, monthsMap } from '../../../constants';

export const CalendarEventsList = ({ date, events }: { date: Date; events: IEvent[] }) => {
    const [day, month] = date.toLocaleDateString().split('.');
    const title = `${day.replace(/(^0)/, '')} ${monthsMap[month]}`;

    return (
        <div className={classes.CalendarEventsList}>
            <h2 className={classes.Title}>{title}</h2>

            <div>
                {events?.length ? (
                    events.map((event) => {
                        const { name, category, place, lent, url, startTime, endTime } = event;

                        const categoryStyle = { background: category.color };

                        return (
                            <div className={classes.CalendarEventsListItem} key={category.color}>
                                <h3 className={classes.EventName}>{name}</h3>

                                <div className={classes.InfoContainer}>
                                    <div className={classes.EventCategory} style={categoryStyle}>
                                        {category.name}
                                    </div>
                                </div>

                                <div className={classes.InfoContainer}>
                                    <div className={classes.EventPlace}>{place}</div>
                                </div>

                                {startTime ? (
                                    <div className={classes.InfoContainer}>
                                        <div className={classes.EventDate}>
                                            <div className={classes.DateItem}>
                                                <div className={classes.Time}>{startTime}</div>
                                            </div>

                                            {endTime ? (
                                                <>
                                                    <span
                                                        className={classes.LongDash}
                                                        dangerouslySetInnerHTML={{ __html: LONG_DASH }}
                                                    />

                                                    <div className={classes.DateItem}>
                                                        <div className={classes.Time}>{endTime}</div>
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                ) : null}

                                {lent ? (
                                    <div className={classes.InfoContainer}>
                                        <div className={classes.InfoTypeName}>Пост:</div>
                                        <div className={classes.EventLent}></div>
                                    </div>
                                ) : null}

                                {url ? (
                                    <div className={classes.InfoContainer}>
                                        <div className={classes.InfoTypeName}>Подробнее:</div>
                                        <div className={classes.EventLink}>
                                            <a href={url} target='_blank'>
                                                {url}
                                            </a>
                                        </div>
                                    </div>
                                ) : null}
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
