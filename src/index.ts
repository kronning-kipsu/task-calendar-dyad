import GoogleCalendars from './calendars/googleCalendar/GoogleCalendars'
import TrelloTasks from './tasks/trello/TrelloTasks'

// Exports
export * from './calendars/googleCalendar/GoogleCalendars'
export * from './tasks/trello/TrelloTasks'

export const createTrelloTasksInstance = (apiKey: string, token: string, listId: string): TrelloTasks => {
    return new TrelloTasks(apiKey, token, listId)
}

export const createGoogleCalendarsInstance = (): GoogleCalendars => {
    return new GoogleCalendars()
}
