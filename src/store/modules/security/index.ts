/* eslint-disable promise/param-names */
import { Module } from 'vuex';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { RootState, SecurityState } from '@/store/types';

const state: SecurityState = { token: localStorage.getItem('token') || '', refresh: localStorage.getItem('refresh') || '', status: '', hasLoadedOnce: false };
const namespaced: boolean = true;

export const security: Module<SecurityState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
