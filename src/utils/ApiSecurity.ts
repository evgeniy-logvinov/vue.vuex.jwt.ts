import RequestTypes from 'utils/RequestTypes';

export default {
    login: { method: RequestTypes.POST, url: '/security/login'},
    logout: { method: RequestTypes.POST, url: '/security/logout'},
};
