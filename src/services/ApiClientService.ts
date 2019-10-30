import axios from 'axios';

export const RestErrors = {
    UNAUTHORAIZED: 401,
    FORBIDDEN: 403,
}
export default class ApiClientService {
    private defaultHeaders: any = {};
    private client: any = {};

    constructor(options: any = {}) {
        this.defaultHeaders = options.headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        this.client = options.client ||
            axios.create({
                baseURL: process.env.API_URL ? process.env.API_URL : '',
                headers: this.defaultHeaders,
            });

        this.client.interceptors.request.use(
            (config: any) => {
                console.log('interseptor request');
                if (!localStorage.getItem('token')) {
                    return config;
                }
                const newHeaders: any = {
                    ...this.defaultHeaders,
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                };
                return {
                    ...config,
                    headers: newHeaders,
                };
            },
            (e: any) => Promise.reject(e),
        );

        this.client.interceptors.response.use(
            (r: any) => r,
            async (error: any) => {
                console.log('interseptor response error');
                if (error.response && error.response.status === RestErrors.FORBIDDEN) {
                    this.removeTokens();
                    throw new Error('USER_UNAUTHORAIZED');
                }

                if (error.response && error.response.status === RestErrors.UNAUTHORAIZED && !error.config.retry) {
                    try {
                        const {data} = await this.createRefreshRequest();
                        this.setTokens({token: data.token, refresh: data.refresh});
                        const newRequest = {
                            ...error.config,
                            retry: true,
                        }
                        return this.client(newRequest);
                    } catch (err) {
                        console.warn('');
                        throw err;
                    } finally {
                        // this.refreshRequest = '';
                    }
                }
                throw error;
            },
            (e: any) => Promise.reject(e),
        );
    }

    private setTokens({token, refresh}: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
    }

    private removeTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    }

    private async createRefreshRequest() {
        console.log('createRefreshRequest');
        return Promise.resolve({data: {token: 'test-token', refresh: 'test-refresh'}});
    }
}
