import gapi_calendarList = gapi.client.calendar.calendarList
import gapi_events = gapi.client.calendar.events


export interface GoogleCalendarListEntry {
    id: string,
    name: string
}

export interface GoogleCalendarEvent {
    id: string,
    summary: string,
    startDate?: string,
    startDateTime?: string,
    startTimeZone?: string,
    endDate?: string,
    endDateTime?: string,
    endTimeZone?: string
}

/**
 * Google Calendar Client to work with Events in available Calendars through
 * gapi (https://developers.google.com/calendar/quickstart/js). This client will assume the gapi client has been
 * authorized (i.e. gapi.load('client:auth2')) and initialized (i.e. gapi.client.init)
 */
export default class GoogleCalendarClient {

    /**
     *
     */
    public getCalendarList(): Promise<GoogleCalendarListEntry[]> {
        return gapi_calendarList.list().then(response => {
            const calendars = response.result.items
            return calendars
                .map((item) => ({
                    id: item.id,
                    name: item.summary
                }))
                .sort((a: GoogleCalendarListEntry, b: GoogleCalendarListEntry) => {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
                })
        });
    }

    /**
     *
     * @param calendarId
     * @param timeMin
     * @param timeMax
     */
    public getEvents(calendarId: string, timeMin: string, timeMax: string): Promise<GoogleCalendarEvent[]> {
        return gapi_events.list({
            calendarId,
            timeMin,
            timeMax,
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime'
        }).then(response => {
            const events = response.result.items
            return events.map((item) => (GoogleCalendarClient.toGoogleCalendarEvent(item)))
        })
    }

    /**
     *
     * @param calendarId
     * @param eventId
     * @param summary
     * @param startDateTime RFC 3339 (e.g. YYYY-MM-DDT00:00:00Z)
     * @param endDateTime   RFC 3339 (e.g. YYYY-MM-DDT00:00:00Z)
     */
    public addEvent(calendarId: string,
                    eventId: string,
                    summary: string,
                    startDateTime: string,
                    endDateTime: string): Promise<GoogleCalendarEvent> {
        return gapi_events.insert({
            calendarId,
            resource: {
                summary,
                start: {
                    dateTime: startDateTime
                },
                end: {
                    dateTime: endDateTime
                }
            }
        }).then(response => {
            return GoogleCalendarClient.toGoogleCalendarEvent(response.result)
        })
    }

    /**
     *
     * @param calendarId
     * @param eventId
     * @param summary
     * @param startDateTime RFC 3339 (e.g. YYYY-MM-DDT00:00:00Z)
     * @param endDateTime   RFC 3339 (e.g. YYYY-MM-DDT00:00:00Z)
     */
    public updateEvent(calendarId: string,
                       eventId: string,
                       summary: string,
                       startDateTime: string,
                       endDateTime: string): Promise<GoogleCalendarEvent> {
        return gapi_events.update({
            calendarId,
            eventId,
            resource: {
                summary,
                start: {
                    dateTime: startDateTime
                },
                end: {
                    dateTime: endDateTime
                }
            }
        }).then(response => {
            return GoogleCalendarClient.toGoogleCalendarEvent(response.result)
        })
    }

    /**
     *
     * @param calendarId
     * @param eventId
     */
    public deleteEvent(calendarId: string, eventId: string): Promise<GoogleCalendarEvent> {
        return gapi_events.delete({
            calendarId,
            eventId
        }).then(response => {
            return GoogleCalendarClient.toGoogleCalendarEvent(response.result)
        })
    }

    private static toGoogleCalendarEvent(item: gapi.client.calendar.Event): GoogleCalendarEvent {
        return {
            id: item.id,
            summary: item.summary,
            startDate: item.start.date,
            startDateTime: item.start.dateTime,
            startTimeZone: item.start.timeZone,
            endDate: item.end.date,
            endDateTime: item.end.dateTime,
            endTimeZone: item.end.timeZone
        }
    }
}
