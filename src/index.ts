import TasksInterface from './tasks/TasksInterface'
import TrelloTasks from './tasks/trello/TrelloTasks'

// Exports
export * from './tasks/trello/TrelloTasks'

export const createTrelloTasksInstance = (apiKey: string, token: string, listId: string) => {
    return new TrelloTasks(apiKey, token, listId)
}
