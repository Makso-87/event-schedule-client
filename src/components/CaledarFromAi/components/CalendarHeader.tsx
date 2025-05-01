import React from 'react';

interface CalendarHeaderProps {
    currentDate: Date;
    onMonthChange: (offset: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onMonthChange }) => {
    return (
        <div>
            <button onClick={() => onMonthChange(-1)}>Предыдущий месяц</button>

            <h2>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>

            <button onClick={() => onMonthChange(1)}>Следующий месяц</button>
        </div>
    );
};

export default CalendarHeader;
