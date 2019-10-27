/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth';
// import { USER_REQUEST } from '../actions/user'
import apiCall from 'utils/api';

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false };

const getters = {
    isAuthenticated: (state: any) => !!state.token,
    authStatus: (state: any) => state.status,
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }: any, user: any) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            apiCall({ url: 'auth', data: user, method: 'POST' })
                .then((resp: any) => {
                    localStorage.setItem('user-token', resp.token);
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    // axios.defaults.headers.common['Authorization'] = resp.token
                    commit(AUTH_SUCCESS, resp);
                    // TODO:
                    // dispatch(USER_REQUEST)
                    resolve(resp);
                })
                .catch((err: any) => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('user-token');
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit, dispatch }: any) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            resolve();
        });
    },
};

const mutations = {
    [AUTH_REQUEST]: (state: any) => {
        state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state: any, resp: any) => {
        state.status = 'success';
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: (state: any) => {
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: (state: any) => {
        state.token = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
