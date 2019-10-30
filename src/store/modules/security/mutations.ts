import { MutationTree } from 'vuex';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '@/store/actions/security';
import { SecurityState } from '@/store/types';

export const mutations: MutationTree<SecurityState> = {
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
