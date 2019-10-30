import { ActionTree } from 'vuex';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/security';
import apiCall from '@/api/api';
import ApiSecurity from '@/api/ApiSecurity';
import {RootState, SecurityState} from '@/store/types';

export const actions: ActionTree<SecurityState, RootState> = {
    [AUTH_REQUEST]: ({ commit, dispatch }: any, user: SecurityState) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            apiCall({ requestApi: ApiSecurity.login, data: user })
                .then(({ token, refresh }: any) => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('refresh', refresh);
                    commit(AUTH_SUCCESS, { token, refresh });
                    resolve({ token, refresh });
                })
                .catch((err: any) => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit, dispatch }: any) => {
        return new Promise((resolve, reject) => {
            apiCall({ requestApi: ApiSecurity.logout })
                .then(() => {
                    commit(AUTH_LOGOUT);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    resolve();
                })
                .catch((err: any) => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    reject(err);
                });
        });
    },
};
