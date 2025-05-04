import React from 'react';
import classes from './CalendarEventsList.module.scss';
import { categories } from '../../../mockData';
import { IEvent } from '../../../interfaces';
import { getFormattedDate } from '../../../utils/calendar/getFormattedDate';
import { LONG_DASH } from '../../../constants';

export const CalendarEventsList = ({ events }: { events: IEvent[] }) => {
    return (
        <div className={classes.CalendarEventsList}>
            {events
                ? events.map((event) => {
                      const { name, categoryId, place, lent, url, startDate, endDate, startTime, endTime } = event;

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
    );
};
