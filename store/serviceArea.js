import districts from '../utils/districts.js'
import provinces from '../utils/provinces.js'

export const state = () => ({
    endpoints: {
        districts: '/api/dataService/district/list', // POST provinceID
        provinces: '/api/dataService/province/list', // POST
        branches: '/api/dataService/branch/list', // POST
    },
    districts,
    provinces,
    branches: [],
    error: null,
});

export const getters = {
    districts(state) {
        return state.districts;
    },
    provinces(state) {
        return state.provinces;
    },
    branches(state) {
        return state.branches;
    },
    error(state) {
        return state.error;
    },
}

export const mutations = {
    districts(state, { districts }) {
        state.districts = districts;
    },
    provinces(state, { provinces }) {
        state.provinces = provinces;
    },
    branches(state, {branches}) {
        state.branches = branches;
    },
    error(state, error) {
        state.error = error;
    },
}

export const actions = {
    async branches(context) {
        try {
            const endpoint = `${context.rootState.centralHost}${context.state.endpoints.branches}`;
            const response = await fetch(endpoint, {method: 'POST'}).then(res => res.json());
            if (response.resCode === 200) {
                context.commit('branches', { branches: response.branchList });
                return true;
            }
            return false;
        } catch (error) {
            context.commit('error', error);
        }
    },
    async districts(context, { provinceID }) {
        try {
            const endpoint = `${context.rootState.centralHost}${context.state.endpoints.districts}`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify({ provinceID, }),
            }).then(res => res.json());
            if (response.resCode === 200) {
                context.commit('districts', {districts: response.district});
                return true;
            }
            return false;
        } catch (error) {
            context.commit('error', error)
        }
    },
    async provinces(context) {
        try {
            const endpoint = `${context.rootState.centralHost}${context.state.endpoints.provinces}`
            const response = await fetch (endpoint, {
                method: 'POST',
            }).then(res => res.json());
            if (response.resCode === 200) {
                context.commit('provinces', {provinces: response.province});
                return true;
            }
            return false;
        } catch (error) {
            context.commit('error', error)
        }
    },
}