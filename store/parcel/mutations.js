export default {
    getParcels(state, payload) {
        state.parcels = [...payload.parcels];
    },
    error(state, payload) {
        state.error = payload.error;
    }
}