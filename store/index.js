export const state = () => ({
    host: 'https://parcel-api.makesend.ninja',
    centralHost: 'https://apiold.makesend.ninja',
});

export const actions = {}
export const mutations = {}
export const getters = {
    host(state) {
        return state.host;
    }
}