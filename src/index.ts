// Main exports for the calendar package
export { YearCalendar } from './components/YearCalendar';
export { MonthGrid } from './components/MonthGrid';
export { EventLegend } from './components/EventLegend';
export { EventDialog } from './components/EventDialog';

// Export types
export type { CalendarEvent, EventType, EventFormData, EventDialogProps } from './types/CalendarEvent';
export { EventType as EventTypeEnum } from './types/CalendarEvent';

// Import and inject styles
import './components/calendar.css';
