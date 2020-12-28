// tslint:disable-next-line:no-var-requires
require('dotenv').config()
import TrelloClient from '../src/tasks/trello/TrelloClient'

/*
 * This can be run in WebStorm with the following settings:
 * - Menu > Run > Edit Configurations
 * - + > Node.js
 *      Node parameters: --require ts-node/register
 *      Working Directory: ~/[path to project]/task-calendar-dyad/examples
 *      JavaScript file: trello.ts
 *      Application parameters: --project tsconfig.json
 * - Copy variables in .env.example
 * - Populate .env with required environment variables
 */

const tc = new TrelloClient(
    process.env.TRELLO_API_KEY || '',
    process.env.TRELLO_TOKEN || ''
)

// Get List by Id
tc.getList(process.env.TRELLO_TEST_LIST_ID || '').then((listData) => {
        // tslint:disable-next-line:no-console
        console.log('(1) List: ', { id: listData.id, name: listData.name })
    })
    // Get Cards
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('(2) Cards: ')
        tc.getCards(process.env.TRELLO_TEST_LIST_ID || '').then((cardListData) => {
            cardListData.forEach((cardData) => {
                // tslint:disable-next-line:no-console
                console.log(`    - Card: ${cardData.id} / ${cardData.name}`)
            })
        })
    })
    // Create Card
    .then(() => {
        return tc.addCard(process.env.TRELLO_TEST_LIST_ID || '', 'Test Card').then((cardData) => {
            // tslint:disable-next-line:no-console
            console.log('(3) New Card: ', { id: cardData.id, name: cardData.name })
            return cardData.id
        })
    })
    // Update Card
    .then((newCardId) => {
        return tc.updateCard(newCardId, 'Test Card Updated').then((updatedCardData) => {
            // tslint:disable-next-line:no-console
            console.log('(4) Updated Card: ', { id: updatedCardData.id, name: updatedCardData.name })
            return updatedCardData.id
        })
    })
    // Delete Card
    .then((updatedCardId) => {
        tc.deleteCard(updatedCardId).then((wasCardDeleted) => {
            // tslint:disable-next-line:no-console
            console.log('(5) Deleted Card: ', wasCardDeleted)
        })
    })
