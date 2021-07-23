export default {
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
    },
    async assignToHubs(context, payload) {
        try {
            console.log(context.state.endpoints)
            const endpoint = `${context.rootState.host}${context.state.endpoints.assignToHubs}/${payload.round}`
            const res = await fetch(endpoint, { method: 'POST', })
            console.log(res);
        } catch (error) {
            context.commit('error', { error })
        }
    },
}