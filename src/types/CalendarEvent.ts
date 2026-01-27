export const EventType = {
  HOLIDAY: 'HOLIDAY',
  SALARY_DAY: 'SALARY_DAY',
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

export interface CalendarEvent {
  id: string;
  name: string;
  date: string; // ISO date string (YYYY-MM-DD)
  type: EventType;
  description?: string;
}

export type EventFormData = Omit<CalendarEvent, 'id'>;

export interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: EventFormData) => void;
  onDelete?: (event: CalendarEvent) => void;
  editingEvent?: CalendarEvent | null;
  selectedDate?: Date | null;
  existingEvents: CalendarEvent[];
  isLoading?: boolean;
}
