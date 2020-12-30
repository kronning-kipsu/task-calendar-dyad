import CalendarData from './CalendarData'
import EventData from './EventData'

export default interface CalendarsInterface {
    getCalendars(): Promise<CalendarData[]>
    getEvents(calendarId: string, dateTimeMin: string, dateTimeMax: string): Promise<EventData[]>
    addEvent(calendarId: string, event: EventData): Promise<EventData>
    updateEvent(calendarId: string, event: EventData): Promise<EventData>
    deleteEvent(calendarId: string, event: EventData): Promise<EventData>
}
