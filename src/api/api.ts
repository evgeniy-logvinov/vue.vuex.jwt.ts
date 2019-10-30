import ApiClientService from '@/services/ApiClientService';

const apiCall = ({ requestApi: { method, url }, data, params, ...args }: any) => {
    return new ApiClientService().client({
        method,
        url,
        data,
        params,
    });
};

export default apiCall;
