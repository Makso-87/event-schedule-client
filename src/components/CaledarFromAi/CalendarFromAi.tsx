import React, { useState, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import Day from './components/Day/Day';
import { categories, events } from '../../mockData';

interface Event {
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    place: string;
    url: string;
    lent: string;
    categoryId: string;
}

const CalendarFromAi: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [eventList, setEventList] = useState<Event[]>(events);
    const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);

    const handleMonthChange = (offset: number) => {
        setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + offset)));
    };

    const daysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getEventsForDay = (day: number) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return eventList.filter((event) => {
            const eventDate = new Date(event.startDate);
            return eventDate.toDateString() === selectedDate.toDateString();
        });
    };

    const handleDayClick = (day: number) => {
        const events = getEventsForDay(day);
        setSelectedDayEvents(events);
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
        );
    };

    const totalDays = daysInMonth(currentDate);
    const daysArray = Array.from({ length: totalDays }, (_, index) => index + 1);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <CalendarHeader currentDate={currentDate} onMonthChange={handleMonthChange} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                    {daysArray.map((day) => (
                        <Day
                            key={day}
                            day={day}
                            events={getEventsForDay(day)}
                            isToday={isToday(day)}
                            onClick={handleDayClick}
                        />
                    ))}
                </div>
            </div>
            <div style={{ marginLeft: '20px', width: '300px' }}>
                <h3>События</h3>
                {selectedDayEvents.length > 0 ? (
                    <ul>
                        {selectedDayEvents.map((event, index) => (
                            <li key={index}>
                                <a href={event.url} target='_blank' rel='noopener noreferrer'>
                                    {event.name}
                                </a>{' '}
                                -{' '}
                                <strong>{categories.find((category) => category.id === event.categoryId)?.name}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет событий на этот день</p>
                )}
            </div>
        </div>
    );
};

export default CalendarFromAi;
