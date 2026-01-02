import React from 'react';
import classes from './EventsList.module.scss';
import { getEventDates } from '../../utils/getEventDates';
import { useAppSelector } from '../../hooks/redux-toolkit-hooks';

export const EventsList = () => {
    const events = useAppSelector((state) => state.eventsList.events);

    return (
        <div className={classes.EventsList}>
            <table>
                <tr>
                    <th>Дата</th>
                    <th>Событие</th>
                    <th>Место проведения</th>
                    <th>Категория</th>
                    <th>Подробнее</th>
                </tr>

                {events.map((event) => {
                    return (
                        <tr>
                            <td>{getEventDates(event)}</td>
                            <td>{event.name}</td>
                            <td>{event.place}</td>
                            <td>{event.category.name}</td>
                            <td>{event.url}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};
