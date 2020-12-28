import TaskData from './TaskData'

export default interface TasksInterface {
    getTasks(): Promise<TaskData[]>
    addTask(task: TaskData): Promise<TaskData>
    updateTask(task: TaskData): Promise<TaskData>
    moveTask(toListId: string, task: TaskData): Promise<TaskData>
    deleteTask(task: TaskData): Promise<boolean>
}
