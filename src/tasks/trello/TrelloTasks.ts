import TasksInterface from '../TasksInterface'
import TaskData from '../TaskData'
import TrelloClient from './TrelloClient'

export default class TrelloTasks implements TasksInterface {
    private readonly client: TrelloClient
    private readonly listId: string

    public constructor(apiKey: string, token: string, listId: string) {
        this.client = new TrelloClient(apiKey, token)
        this.listId = listId
    }

    public getTasks(): Promise<TaskData[]> {
        return this.client.getCards(this.listId);
    }

    public addTask(task: TaskData): Promise<TaskData> {
        return this.client.addCard(this.listId, task.name)
    }

    public updateTask(task: TaskData): Promise<TaskData> {
        if (!task.id) {
            throw new Error('Task ID is required')
        }
        return this.client.updateCard(task.id, task.name)
    }

    public moveTask(toListId: string, task: TaskData): Promise<TaskData> {
        throw new Error('Not yet implemented')
    }

    public deleteTask(task: TaskData): Promise<boolean> {
        if (!task.id) {
            throw new Error('Task ID is required')
        }
        return this.client.deleteCard(task.id)
    }
}
