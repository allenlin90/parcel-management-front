export default {
    parcels(state) {
        return state.parcels;
    },
    firstRoundParcels(state) {
        return state.parcels.filter(parcel => parcel.pickupRound === 1 || parcel.pickupRound === 4);
    },
    secondRoundParcels(state) {
        return state.parcels.filter(parcel => parcel.pickupRound === 2 || parcel.pickupRound === 5);
    },
    thridRoundParcels(state) {
        return state.parcels.filter(parcel => parcel.pickupRound === 3 || parcel.pickupRound === 6);
    },
}