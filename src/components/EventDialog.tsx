import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { EventType, type EventDialogProps, type EventFormData } from '../types/CalendarEvent';
import { toast } from 'sonner';

export const EventDialog: React.FC<EventDialogProps> = ({
    open,
    onOpenChange,
    onSave,
    onDelete,
    editingEvent,
    selectedDate,
    existingEvents,
    isLoading = false,
}) => {
    const [formData, setFormData] = useState<EventFormData>({
        name: '',
        date: '',
        type: EventType.HOLIDAY,
        description: '',
    });

    // Helper to extract YYYY-MM-DD from any date format
    const toDateInputValue = (dateStr: string): string => {
        // If already in YYYY-MM-DD format (10 chars), return as-is
        // Otherwise extract from ISO string
        return dateStr.substring(0, 10);
    };

    // Reset form when dialog opens/closes or editing event changes
    useEffect(() => {
        if (open) {
            if (editingEvent) {
                setFormData({
                    name: editingEvent.name,
                    date: toDateInputValue(editingEvent.date),
                    type: editingEvent.type,
                    description: editingEvent.description || '',
                });
            } else if (selectedDate) {
                // Return YYYY-MM-DD in local time
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;

                setFormData({
                    name: '',
                    date: dateStr,
                    type: EventType.HOLIDAY,
                    description: '',
                });
            } else {
                // Default clean state
                setFormData({
                    name: '',
                    date: '',
                    type: EventType.HOLIDAY,
                    description: '',
                });
            }
        }
    }, [open, editingEvent, selectedDate]);

    // Set initial date if provided (when clicking on a date)
    // const setInitialDate = (date: string) => {
    //     setFormData(prev => ({ ...prev, date }));
    // };

    // Validation
    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            toast.error('Please enter an event name');
            return false;
        }

        if (!formData.date) {
            toast.error('Please select a date');
            return false;
        }

        // Check if date is a weekend
        // Parse date properly to avoid timezone issues
        const [year, month, day] = formData.date.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day);
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            toast.error('Cannot add events on weekends (Saturday or Sunday)');
            return false;
        }

        // If adding/editing salary day, check if another salary day exists in the same month
        if (formData.type === EventType.SALARY_DAY) {
            const selectedMonth = selectedDate.getMonth();
            const selectedYear = selectedDate.getFullYear();

            const existingSalaryDayInMonth = existingEvents.find(event => {
                if (event.type !== EventType.SALARY_DAY) return false;
                // Skip the event being edited
                if (editingEvent && event.id === editingEvent.id) return false;

                const eventDate = new Date(event.date);
                return eventDate.getMonth() === selectedMonth &&
                    eventDate.getFullYear() === selectedYear;
            });

            if (existingSalaryDayInMonth) {
                const monthName = selectedDate.toLocaleString('default', { month: 'long' });
                toast.error(`A salary day already exists for ${monthName} ${selectedYear}`);
                return false;
            }
        }

        return true;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        onSave(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
                    <DialogDescription>
                        {editingEvent
                            ? 'Update the event details below.'
                            : 'Create a new holiday or salary day. Note: Weekends cannot be selected.'}
                    </DialogDescription>
                </DialogHeader>

                <DialogBody className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="event-name">Event Name</Label>
                        <Input
                            id="event-name"
                            placeholder="e.g., Independence Day"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="event-type">Event Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value as EventType })}
                        >
                            <SelectTrigger id="event-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={EventType.HOLIDAY}>Holiday</SelectItem>
                                <SelectItem value={EventType.SALARY_DAY}>Salary Day</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Input
                            id="event-date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="event-description">Description (Optional)</Label>
                        <Input
                            id="event-description"
                            placeholder="Additional details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </DialogBody>

                <DialogFooter>
                    <div className="flex w-full justify-between">
                        {editingEvent && onDelete && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    onDelete(editingEvent);
                                    onOpenChange(false);
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <div className="flex gap-2 ml-auto">
                            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading ? 'Saving...' : (editingEvent ? 'Update' : 'Save')}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
