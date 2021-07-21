export default () => {
    return {
        endpoints: {
            allParcels: '/parcel/central', // GET
            editParcel: '/parcel', // PATCH
        },
        parcels: [],
        error: null,
    };
}