import RESTClient from '../../helpers/RESTClient'

export interface ListData {
    id: string,
    name: string
}

export interface CardData {
    id: string,
    name: string
}

/**
 * Implements various requests from the Trello REST API.
 *
 * - https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/
 * - https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/
 * - https://developer.atlassian.com/cloud/trello/rest/api-group-actions/
 */
export default class TrelloClient {

    private restClient: RESTClient

    public constructor(apiKey: string, token: string | null = null) {
        const headers = {
            'Authorization': `OAuth oauth_consumer_key="${apiKey}", oauth_token="${token}"`
        }
        this.restClient = new RESTClient('https://api.trello.com/1/', headers)
    }

    public getList(listId: string): Promise<ListData> {
         return this.restClient.get<ListData>(`lists/${listId}`)
            .then((listResp) => {
                return listResp.data
            })
    }

    public getCards(listId: string): Promise<CardData[]> {
        return this.restClient.get<CardData[]>(`lists/${listId}/cards`)
            .then((cardListResp) => {
                return cardListResp.data
            })
    }

    public addCard(listId: string, name: string): Promise<CardData> {
        return this.restClient.post<CardData>('cards', {
                idList: listId,
                name,
                pos: 'bottom'
            })
            .then((cardResp) => {
                return cardResp.data
            })
    }

    public updateCard(cardId: string, name: string): Promise<CardData> {
        return this.restClient.put<CardData>(`cards/${cardId}`, { name })
            .then((cardResp) => {
                return cardResp.data
            })
    }

    public deleteCard(cardId: string): Promise<boolean> {
        return this.restClient.delete<CardData>(`cards/${cardId}`)
            .then(() => {
                return true
            })
    }
}
