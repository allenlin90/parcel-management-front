export default {
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