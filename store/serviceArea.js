import districts from '../utils/districts.js'
import provinces from '../utils/provinces.js'

export const state = () => ({
    districts,
    provinces
});

export const getters = {
    districts(state) {
        return state.districts;
    },
    provinces(state) {
        return state.provinces;
    },
}

export const mutations = {}
export const actions = {}