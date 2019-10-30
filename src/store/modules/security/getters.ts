import { GetterTree } from 'vuex';
import {RootState, SecurityState} from '@/store/types';

export const getters: GetterTree<SecurityState, RootState> = {
    isAuthenticated: (state: SecurityState) => !!state.token,
    authStatus: (state: SecurityState) => state.status,
};
