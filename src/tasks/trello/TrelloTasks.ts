import TasksInterface from '../TasksInterface'
import TaskData from '../TaskData'
import TrelloClient, { CardData } from './TrelloClient'

export default class TrelloTasks implements TasksInterface {
    private readonly client: TrelloClient
    private readonly listId: string

    public constructor(apiKey: string, token: string, listId: string) {
        this.client = new TrelloClient(apiKey, token)
        this.listId = listId
    }

    public getTasks(): Promise<TaskData[]> {
        return this.client.getCards(this.listId)
            .then((cardsData) => {
                return cardsData.map((card) => (TrelloTasks.toTaskData(card)))
            })
    }

    public addTask(task: TaskData): Promise<TaskData> {
        return this.client.addCard(this.listId, task.name)
            .then((cardData) => {
                return TrelloTasks.toTaskData(cardData)
            })
    }

    public updateTask(task: TaskData): Promise<TaskData> {
        if (!task.id) {
            throw new Error('Task ID is required')
        }
        return this.client.updateCard(task.id, task.name)
            .then((cardData) => {
                return TrelloTasks.toTaskData(cardData)
            })
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

    private static toTaskData(cardData: CardData): TaskData {
        return {
            id: cardData.id,
            name: cardData.name
        }
    }
}
