// tslint:disable-next-line:no-var-requires
require('dotenv').config()
import { createTrelloTasksInstance } from '../src'

/*
 * This can be run in WebStorm with the following settings:
 * - Menu > Run > Edit Configurations
 * - + > Node.js
 *      Node parameters: --require ts-node/register
 *      Working Directory: ~/[path to project]/task-calendar-dyad/examples
 *      JavaScript file: taskCalendarDyadExamples.ts
 *      Application parameters: --project tsconfig.json
 * - Copy variables in .env.example
 * - Populate .env with required environment variables
 */


const tt = createTrelloTasksInstance(
    process.env.TRELLO_API_KEY || '',
    process.env.TRELLO_TOKEN || '',
    process.env.TRELLO_TEST_LIST_ID || ''
)

tt.getTasks().then((tasks) => {
    // tslint:disable-next-line:no-console
    console.log('Trello tasks for ', tasks)
})
