# React Shadcn Calendar

A beautiful, customizable calendar component built with React and shadcn/ui. Perfect for displaying events, holidays, and salary days in a clean year-view format.

## Features

- 📅 Full year calendar view with monthly grids
- 🎨 Built with shadcn/ui components for consistent styling
- 🎯 Event management (Holidays, Salary Days)
- ✏️ Editable mode with event creation/editing
- 🎨 Weekend highlighting
- 📱 Responsive grid layout
- 🔧 Fully customizable and type-safe

## Installation

```bash
npm install @fahadanwar11/react-shadcn-calendar
```

### Prerequisites

This package requires React 18+ and uses shadcn/ui components. Make sure you have shadcn/ui set up in your project:

```bash
npx shadcn@latest init
```

Then install the required shadcn components:

```bash
npx shadcn@latest add dialog button input label select
```

You'll also need to install Tailwind CSS and configure it for your project.

## Usage

### Basic Usage

```tsx
import { YearCalendar, EventType } from '@fahadanwar11/react-shadcn-calendar';
import type { CalendarEvent } from '@fahadanwar11/react-shadcn-calendar';
import '@fahadanwar11/react-shadcn-calendar/styles.css';

const events: CalendarEvent[] = [
  {
    id: '1',
    name: 'New Year',
    date: '2026-01-01',
    type: EventType.HOLIDAY,
    description: 'Happy New Year!',
  },
  {
    id: '2',
    name: 'Monthly Salary',
    date: '2026-01-31',
    type: EventType.SALARY_DAY,
  },
];

function App() {
  return (
    <YearCalendar 
      year={2026} 
      events={events}
    />
  );
}
```

### Editable Calendar with Event Dialog

```tsx
import { useState } from 'react';
import { YearCalendar, EventDialog } from '@fahadanwar11/react-shadcn-calendar';
import type { CalendarEvent, EventFormData } from '@fahadanwar11/react-shadcn-calendar';
import { toast } from 'sonner';

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDate(null);
    setDialogOpen(true);
  };

  const handleSaveEvent = (formData: EventFormData) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...formData, id: editingEvent.id } 
          : e
      ));
      toast.success('Event updated successfully');
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        ...formData,
        id: Date.now().toString(),
      };
      setEvents([...events, newEvent]);
      toast.success('Event created successfully');
    }
  };

  const handleDeleteEvent = (event: CalendarEvent) => {
    setEvents(events.filter(e => e.id !== event.id));
    toast.success('Event deleted successfully');
  };

  return (
    <>
      <YearCalendar 
        year={2026}
        events={events}
        editable={true}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
      
      <EventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        existingEvents={events}
      />
    </>
  );
}
```

## API Reference

### YearCalendar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `year` | `number` | Current year | The year to display |
| `events` | `CalendarEvent[]` | Required | Array of events to display |
| `editable` | `boolean` | `false` | Enable editing mode |
| `onDateClick` | `(date: Date) => void` | - | Callback when a date is clicked (editable mode) |
| `onEventClick` | `(event: CalendarEvent) => void` | - | Callback when an event is clicked |

### EventDialog

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Dialog open state |
| `onOpenChange` | `(open: boolean) => void` | Dialog state change handler |
| `onSave` | `(event: EventFormData) => void` | Save event handler |
| `onDelete` | `(event: CalendarEvent) => void` | Delete event handler (optional) |
| `editingEvent` | `CalendarEvent \| null` | Event being edited |
| `selectedDate` | `Date \| null` | Selected date for new event |
| `existingEvents` | `CalendarEvent[]` | All existing events (for validation) |
| `isLoading` | `boolean` | Loading state |

### Types

```typescript
export interface CalendarEvent {
  id: string;
  name: string;
  date: string; // ISO date string (YYYY-MM-DD)
  type: EventType;
  description?: string;
}

export const EventType = {
  HOLIDAY: 'HOLIDAY',
  SALARY_DAY: 'SALARY_DAY',
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];
```

## Customization

The calendar uses CSS variables from your shadcn/ui theme. You can customize colors by modifying your Tailwind CSS configuration or the CSS variables in your theme.

### Custom Styling

You can override the default styles by targeting these CSS classes:

- `.year-calendar` - Main container
- `.calendar-grid` - Grid container for months
- `.month-grid` - Individual month container
- `.calendar-day-cell` - Individual day cell
- `.event-indicator` - Event badge
- `.event-legend` - Legend section

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
