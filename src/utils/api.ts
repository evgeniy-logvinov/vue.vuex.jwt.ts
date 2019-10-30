import ApiClientService from '@/services/ApiClientService';

// const mocks: any = {
//     'auth': { POST: { token: 'This-is-a-mocked-token' } },
//     'user/me': { GET: { name: 'doggo', title: 'sir' } },
// };

const apiCall = async ({ requestApi: { method, url }, data, params, ...args }: any) => {
    return await new ApiClientService().client({
        method,
        url,
        data,
        params,
    });
};

export default apiCall;
