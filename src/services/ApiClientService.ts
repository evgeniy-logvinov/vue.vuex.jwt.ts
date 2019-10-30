import axios from 'axios';

export const RestErrors = {
    UNAUTHORAIZED: 401,
    FORBIDDEN: 403,
};

const apiV1 = 'api/v1/';

export default class ApiClientService {
    public client: any = {};
    private defaultHeaders: any = {};

    constructor(options: any = {}) {
        this.defaultHeaders = options.headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        this.client = options.client ||
            axios.create({
                baseURL: process.env.VUE_APP_BASE_URI ? `${process.env.VUE_APP_BASE_URI}${apiV1}` : `${apiV1}`,
                headers: this.defaultHeaders,
            });

        this.client.interceptors.request.use(
            (config: any) => {
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
            (r: any) => r.data,
            async (error: any) => {
                console.log('=========>')
                console.log('interseptor response error');
                if (error.response && error.response.status === RestErrors.FORBIDDEN) {
                    this.removeTokens();
                    throw new Error('USER_UNAUTHORAIZED');
                }
                // if (error.response && error.response.status === RestErrors.UNAUTHORAIZED && !error.config.retry) {
                //     console.log('true', error.config);
                //     try {
                //         const {data} = await this.createRefreshRequest();
                //         this.setTokens({token: data.token, refresh: data.refresh});
                //         const newRequest = {
                //             ...error.config,
                //             retry: true,
                //         }
                //         console.log(newRequest)
                //         // return this.client(newRequest);
                //     } catch (err) {
                //         console.warn('');
                //         throw err;
                //     } finally {
                //         this.refreshRequest = null;
                //     }
                // }
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
        return Promise.resolve({data: {token: 'test-token', refresh: 'test-refresh'}});
    }
}
