export const state = () => ({
    endpoints: {
        allHubs: '/hub',
    },
    hubs: [],
    error: null,
})

export const getters = {
    hubs(state) {
        return state.hubs;
    }
}

export const mutations = {
    hub(state, payload) {
        state.hubs = payload.hubs.map(hub => {
            hub.tasks = [];
            return hub
        });
    },
    error(state, payload) {
        state.error = payload.error;
    }
}

export const actions = {
    async hub(context) {
        try {
            const endpoint = `${context.rootState.host}${context.state.endpoints.allHubs}`;
            const res = await fetch(endpoint).then(res => res.json());
            if (Array.isArray(res) && res.length) {
                context.commit('hub', { hubs: res })
                return true;
            }
            return false;
        } catch (error) {
            context.commit('error', { error });
        }
    }
}