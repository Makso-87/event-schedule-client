import React from 'react';
import classes from './EventsList.module.scss';
import { IEvent } from '../../interfaces';
import { getEventDates } from '../../utils/getEventDates';
import { categories } from '../../mockData';

const categoriesMapping = categories.reduce((acc: Record<string, string>, { name, id }) => {
    return { ...acc, [id]: name };
}, {});

export const EventsList = ({ events }: { events: IEvent[] }) => {
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
                            <td>{categoriesMapping[event.categoryId]}</td>
                            <td>{event.url}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};
