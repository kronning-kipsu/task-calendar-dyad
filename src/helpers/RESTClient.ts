import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Simple Axios/Promise based REST Client
 */
export default class RESTClient {
    private readonly apiUrl: string
    private readonly headers: object

    /**
     *
     * @param apiUrl  - Base API url (include trailing slash)
     * @param headers - Object of request headers to add to each request
     */
    public constructor(apiUrl: string, headers: object = {}) {
        this.apiUrl = apiUrl
        this.headers = headers
    }

    /**
     *
     * @param resource - API resource (e.g. 'users')
     * @param params   - URL parameters
     * @param headers  - Object of request headers to add to this request
     */
    public get<T, R = AxiosResponse<T>>(resource: string, params: object = {}, headers: object = {}): Promise<R> {
        return axios.get<T, R>(
            this.getFullUrl(resource),
            this.getRequestConfig(params, headers)
        )
    }

    /**
     *
     * @param resource - API resource (e.g. 'users')
     * @param data     - JSON data to send in the request
     * @param headers  - Object of request headers to add to this request
     */
    public post<T, R = AxiosResponse<T>>(resource: string, data: object, headers: object = {}): Promise<R> {
        return axios.post<T, R>(
            this.getFullUrl(resource),
            data,
            this.getRequestConfig(undefined, headers)
        )
    }

    /**
     *
     * @param resource - API resource (e.g. 'users')
     * @param data     - JSON data to send in the request
     * @param headers  - Object of request headers to add to this request
     */
    public put<T, R = AxiosResponse<T>>(resource: string, data: object, headers: object = {}): Promise<R> {
        return axios.put<T, R>(
            this.getFullUrl(resource),
            data,
            this.getRequestConfig(undefined, headers)
        )
    }

    /**
     *
     * @param resource - API resource (e.g. 'users')
     * @param data     - JSON data to send in the request
     * @param headers  - Object of request headers to add to this request
     */
    public patch<T, R = AxiosResponse<T>>(resource: string, data: object, headers: object = {}): Promise<R> {
        return axios.patch<T, R>(
            this.getFullUrl(resource),
            data,
            this.getRequestConfig(undefined, headers)
        )
    }

    /**
     *
     * @param resource - API resource (e.g. 'users')
     * @param headers  - Object of request headers to add to this request
     */
    public delete<T, R = AxiosResponse<T>>(resource: string, headers: object = {}): Promise<R> {
        return axios.delete<T, R>(
            this.getFullUrl(resource),
            this.getRequestConfig(undefined, headers)
        )
    }

    private getFullUrl(resource: string): string {
        return `${this.apiUrl}${resource}`
    }

    private getRequestConfig(params: object = {}, headers: object): AxiosRequestConfig {
        return {
            params,
            headers: Object.assign({}, this.headers, headers)
        }
    }
}
