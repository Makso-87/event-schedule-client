import React from 'react';
import classes from './CalendarEventsList.module.scss';
import { IEvent } from '../../../interfaces';
import { monthsMap } from '../../../constants';
import { getNearestEventsTitle } from '../../../utils/calendar/getNearestEventsTitle';
import { AccessTimeFilled } from '../../Icons/AccessTimeFilled';

export const CalendarEventsList = ({
    date,
    events,
    showNearestEvents,
}: {
    date: Date;
    events: IEvent[];
    showNearestEvents: boolean;
}) => {
    const [day, month] = date.toLocaleDateString().split('.');
    const title = `${day.replace(/(^0)/, '')} ${monthsMap[month]}`;
    const nearestEventsTitle = getNearestEventsTitle(events, showNearestEvents);

    return (
        <div className={classes.CalendarEventsList}>
            {showNearestEvents ? (
                <>
                    {/*<h2 className={classes.Title}>{nearestEventsTitle}</h2>*/}
                    <h3 className={classes.SubTitle}>{title}</h3>
                </>
            ) : (
                <h2 className={classes.Title}>{title}</h2>
            )}

            <div>
                {events?.length ? (
                    events.map((event) => {
                        const { id, name, place, lent, url, startTime } = event;

                        return (
                            <div className={classes.CalendarEventsListItem} key={id}>
                                <table>
                                    <td className={classes.TimeColumn}>
                                        {startTime ? (
                                            <div className={classes.TimeContainer}>
                                                <div className={classes.TimeIcon}>
                                                    <AccessTimeFilled />
                                                </div>

                                                <div className={classes.InfoContainer}>
                                                    <div className={classes.EventDate}>
                                                        <div className={classes.DateItem}>
                                                            <div className={classes.Time}>{startTime}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </td>

                                    <td className={classes.InfoColumn}>
                                        <h3 className={classes.EventName}>{name}</h3>

                                        <div className={classes.InfoContainer}>
                                            <div className={classes.EventPlace}>{place}</div>
                                        </div>

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
                                    </td>
                                </table>
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
