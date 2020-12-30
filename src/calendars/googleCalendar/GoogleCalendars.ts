import CalendarsInterface from '../CalendarsInterface'
import CalendarData from '../CalendarData'
import EventData from '../EventData'
import GoogleCalendarClient, { GoogleCalendarEvent } from './GoogleCalendarClient'

export default class GoogleCalendars implements CalendarsInterface {
    private readonly client: GoogleCalendarClient

    public constructor() {
        this.client = new GoogleCalendarClient()
    }

    public getCalendars(): Promise<CalendarData[]> {
        return this.client.getCalendarList()
    }

    public getEvents(calendarId: string, dateTimeMin: string, dateTimeMax: string): Promise<EventData[]> {
        return this.client.getEvents(calendarId, dateTimeMin, dateTimeMax)
            .then(events => {
                return events.map(googleCalendarEvent => (GoogleCalendars.toEventData(googleCalendarEvent)))
            })
    }

    public addEvent(calendarId: string, event: EventData): Promise<EventData> {
        return this.client.addEvent(calendarId, event.name, event.startDateTime, event.endDateTime)
            .then(googleCalendarEvent => {
                return GoogleCalendars.toEventData(googleCalendarEvent)
            })
    }

    public updateEvent(calendarId: string, event: EventData): Promise<EventData> {
        if (!event.id) {
            throw new Error('Event ID is required')
        }
        return this.client.updateEvent(calendarId, event.id, event.name, event.startDateTime, event.endDateTime)
            .then(googleCalendarEvent => {
                return GoogleCalendars.toEventData(googleCalendarEvent)
            })
    }

    public deleteEvent(calendarId: string, event: EventData): Promise<EventData> {
        if (!event.id) {
            throw new Error('Event ID is required')
        }
        return this.client.deleteEvent(calendarId, event.id)
            .then(googleCalendarEvent => {
                return GoogleCalendars.toEventData(googleCalendarEvent)
            })
    }

    private static toEventData(googleCalendarEvent: GoogleCalendarEvent): EventData {
        return {
            id: googleCalendarEvent.id,
            name: googleCalendarEvent.summary,
            startDateTime: googleCalendarEvent.startDateTime || googleCalendarEvent.startDate || '',
            endDateTime: googleCalendarEvent.endDateTime || googleCalendarEvent.endDate || ''
        }
    }
}
