import axios, { AxiosResponse } from 'axios'
import RESTClient from './RESTClient'

jest.mock('axios')

describe('RESTClient tests', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    interface RespData {
        success: boolean
    }

    const RESP_DATA = { success: true }

    const API_URL: string = 'https://api.example.com/v1/'

    const factory = () => {
        return new RESTClient(API_URL)
    }

    beforeEach(() => {
        mockedAxios.get.mockClear()
        mockedAxios.get.mockResolvedValue(RESP_DATA)
        mockedAxios.post.mockClear()
        mockedAxios.post.mockResolvedValue(RESP_DATA)
        mockedAxios.put.mockClear()
        mockedAxios.put.mockResolvedValue(RESP_DATA)
        mockedAxios.patch.mockClear()
        mockedAxios.patch.mockResolvedValue(RESP_DATA)
        mockedAxios.delete.mockClear()
        mockedAxios.delete.mockResolvedValue(RESP_DATA)
    })

    test('test get', async () => {
        const rc = factory()
        await expect(rc.get<RespData>('get')).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${API_URL}get`,
            {params: {}, headers: {}}
        )
    })

    test('test get with params and headers', async () => {
        const rc = factory()
        const params = { a: 1 }
        const headers = { 'HEADER': '123' }
        await expect(rc.get<RespData>('get', params, headers)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${API_URL}get`,
            {params, headers}
        )
    })

    test('test get constructed with headers', async () => {
        const headers = { 'HEADER': '123' }
        const rc = new RESTClient(API_URL, headers)
        await expect(rc.get<RespData>('get')).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${API_URL}get`,
            {params: {}, headers}
        )
    })

    test('test post', async () => {
        const rc = factory()
        const data = { a: 1 }
        await expect(rc.post<RespData>('post', data)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${API_URL}post`,
            data,
            {params: {}, headers: {}}
        )
    })

    test('test post with headers', async () => {
        const rc = factory()
        const data = { a: 1 }
        const headers = { 'HEADER': '123' }
        await expect(rc.post<RespData>('post', data, headers)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${API_URL}post`,
            data,
            {params: {}, headers}
        )
    })

    test('test put', async () => {
        const rc = factory()
        const data = { a: 1 }
        await expect(rc.put<RespData>('put', data)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.put).toHaveBeenCalledWith(
            `${API_URL}put`,
            data,
            {params: {}, headers: {}}
        )
    })

    test('test put with headers', async () => {
        const rc = factory()
        const data = { a: 1 }
        const headers = { 'HEADER': '123' }
        await expect(rc.put<RespData>('put', data, headers)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.put).toHaveBeenCalledWith(
            `${API_URL}put`,
            data,
            {params: {}, headers}
        )
    })

    test('test patch', async () => {
        const rc = factory()
        const data = { a: 1 }
        await expect(rc.patch<RespData>('patch', data)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.patch).toHaveBeenCalledWith(
            `${API_URL}patch`,
            data,
            {params: {}, headers: {}}
        )
    })

    test('test patch with headers', async () => {
        const rc = factory()
        const data = { a: 1 }
        const headers = { 'HEADER': '123' }
        await expect(rc.patch<RespData>('patch', data, headers)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.patch).toHaveBeenCalledWith(
            `${API_URL}patch`,
            data,
            {params: {}, headers}
        )
    })

    test('test delete', async () => {
        const rc = factory()
        await expect(rc.delete<RespData>('delete')).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.delete).toHaveBeenCalledWith(
            `${API_URL}delete`,
            {params: {}, headers: {}}
        )
    })

    test('test delete with headers', async () => {
        const rc = factory()
        const headers = { 'HEADER': '123' }
        await expect(rc.delete<RespData>('delete', headers)).resolves.toEqual(RESP_DATA)
        expect(mockedAxios.delete).toHaveBeenCalledWith(
            `${API_URL}delete`,
            {params: {}, headers}
        )
    })
})
