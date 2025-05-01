import React from 'react';
import { categories } from '../../../../mockData';

interface DayProps {
    day: number;
    events: any[];
    isToday: boolean;
    onClick: (day: number) => void;
}

const Day: React.FC<DayProps> = ({ day, events, isToday, onClick }) => {
    const dayColor =
        events.length > 0 ? categories.find((category) => category.id === events[0].categoryId)?.color : '';

    return (
        <div
            onClick={() => onClick(day)}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: isToday ? '#ffeb3b' : dayColor ? dayColor : 'white',
                cursor: 'pointer',
            }}
        >
            {day}
            {events.length > 1 && <div>{events.length}</div>}
        </div>
    );
};

export default Day;
