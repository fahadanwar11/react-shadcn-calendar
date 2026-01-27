import React from 'react';
import { EventType, type CalendarEvent } from '../types/CalendarEvent';
import './calendar.css';

interface MonthGridProps {
    year: number;
    month: number; // 0-11 (January = 0)
    events: CalendarEvent[];
    editable?: boolean;
    onDateClick?: (date: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthGrid: React.FC<MonthGridProps> = ({
    year,
    month,
    events,
    editable = false,
    onDateClick,
    onEventClick,
}) => {
    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // Adjust to Monday = 0, Sunday = 6
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create array of day cells
    const dayCells: (number | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayAdjusted; i++) {
        dayCells.push(null);
    }

    // Add day numbers
    for (let day = 1; day <= daysInMonth; day++) {
        dayCells.push(day);
    }

    // Helper function to check if date is weekend
    const isWeekend = (day: number): boolean => {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    };

    // Helper function to get events for a specific date
    const getEventsForDate = (day: number): CalendarEvent[] => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => {
            // Handle both YYYY-MM-DD and full ISO date formats
            const eventDateStr = event.date.substring(0, 10);
            return eventDateStr === dateStr;
        });
    };

    // Handle date cell click
    const handleDateClick = (day: number) => {
        if (!editable || !onDateClick) return;
        if (isWeekend(day)) return; // Don't allow clicks on weekends

        const date = new Date(year, month, day);
        onDateClick(date);
    };

    // Handle event click
    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        if (editable && onEventClick) {
            onEventClick(event);
        }
    };

    // Get CSS class for day cell
    const getDayCellClass = (day: number | null): string => {
        if (day === null) return 'calendar-day-cell empty';

        const classes = ['calendar-day-cell'];

        if (isWeekend(day)) {
            classes.push('weekend');
        }

        const dayEvents = getEventsForDate(day);
        if (dayEvents.length > 0) {
            const hasHoliday = dayEvents.some(e => e.type === EventType.HOLIDAY);
            const hasSalary = dayEvents.some(e => e.type === EventType.SALARY_DAY);

            if (hasHoliday) classes.push('has-holiday');
            if (hasSalary) classes.push('has-salary');
        }

        if (editable && !isWeekend(day)) {
            classes.push('clickable');
        }

        return classes.join(' ');
    };

    return (
        <div className="month-grid">
            <p className="text-secondary font-semibold text-lg">
                {MONTH_NAMES[month]}
            </p>

            <div className="weekday-header">
                {WEEKDAYS.map(day => (
                    <div key={day} className="weekday-cell">
                        {day}
                    </div>
                ))}
            </div>

            <div className="days-grid">
                {dayCells.map((day, index) => (
                    <div
                        key={index}
                        className={getDayCellClass(day)}
                        onClick={() => day && handleDateClick(day)}
                    >
                        {day && (
                            <>
                                <span className="day-number">{day}</span>
                                {day && getEventsForDate(day).map(event => (
                                    <div
                                        key={event.id}
                                        className={`event-indicator ${event.type.toLowerCase()}`}
                                        onClick={(e) => handleEventClick(event, e)}
                                        title={event.name}
                                    >
                                        <span className="event-name">{event.name}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
