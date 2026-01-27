import React from 'react';
import { EventType, type CalendarEvent } from '../types/CalendarEvent';
import './calendar.css';

interface EventLegendProps {
    events: CalendarEvent[];
}

export const EventLegend: React.FC<EventLegendProps> = ({ events }) => {
    // Group events by type
    const holidays = events.filter(e => e.type === EventType.HOLIDAY);
    const salaryDays = events.filter(e => e.type === EventType.SALARY_DAY);

    // Format event list
    const formatEventList = (eventList: CalendarEvent[]): string => {
        return eventList.map(e => {
            const date = new Date(e.date);
            return `${String(date.getDate()).padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })} ${e.name}`;
        }).join(', ');
    };

    return (
        <div className="event-legend">
            <div className="legend-section">
                <div className="legend-item">
                    <div className="legend-indicator holiday-indicator">N</div>
                    <div className="legend-label">Holidays</div>
                </div>
                <div className="legend-events">
                    {holidays.length > 0 ? formatEventList(holidays) : 'No holidays'}
                </div>
            </div>

            <div className="legend-section">
                <div className="legend-item">
                    <div className="legend-indicator salary-indicator">O</div>
                    <div className="legend-label">Salary Days</div>
                </div>
                <div className="legend-events">
                    {salaryDays.length > 0 ? formatEventList(salaryDays) : 'No salary days'}
                </div>
            </div>

            <div className="legend-section">
                <div className="legend-item">
                    <div className="legend-indicator weekend-indicator">S</div>
                    <div className="legend-label">Weekends</div>
                </div>
                <div className="legend-events">
                    Saturday and Sunday
                </div>
            </div>
        </div>
    );
};
