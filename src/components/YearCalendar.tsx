import React from 'react';
import { MonthGrid } from './MonthGrid';
import { EventLegend } from './EventLegend';
import './calendar.css';
import type { CalendarEvent } from '../types/CalendarEvent';

interface YearCalendarProps {
    year?: number;
    events: CalendarEvent[];
    editable?: boolean;
    onDateClick?: (date: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
}

export const YearCalendar: React.FC<YearCalendarProps> = ({
    year = new Date().getFullYear(),
    events,
    editable = false,
    onDateClick,
    onEventClick,
}) => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="year-calendar">
            <div className="calendar-grid">
                {months.map((month) => (
                    <MonthGrid
                        key={month}
                        year={year}
                        month={month}
                        events={events}
                        editable={editable}
                        onDateClick={onDateClick}
                        onEventClick={onEventClick}
                    />
                ))}
            </div>

            <EventLegend events={events} />
        </div>
    );
};
