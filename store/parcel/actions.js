export default {
    async getParcels(context, payload) {
        try {
            const endpoint = `${context.rootState.host}${context.state.endpoints.allParcels}/${payload.serviceDate}`;
            const res = await fetch(endpoint).then(res => res.json());
            if (res.resCode === 200) {
                context.commit('getParcels', { parcels: res.orderList, });
                return true;
            }
            return false;
        } catch (error) {
            context.commit('error', { error });
        }
    },
    async editParcel(context, payload) {
        try {
            const endpoint = `${context.rootState.host}${context.state.endpoints.editParcel}/${payload.trackingID}`;
            const res = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod: payload.parcel.cod,
                    dropAddress: payload.parcel.dropAddress,
                    dropDistrict: payload.parcel.dropDistrict,
                    dropPostcode: payload.parcel.dropPostcode,
                    dropProvince: payload.parcel.dropProvince,
                    dropRound: payload.parcel.dropRound,
                    orderDate: payload.parcel.orderDate,
                    orderID: payload.parcel.orderID,
                    parcelChanged: payload.parcel.parcelChanged,
                    parcelCreatedAt: payload.parcel.parcelCreatedAt,
                    parcelSize: payload.parcel.parcelSize,
                    parcelType: payload.parcel.parcelType,
                    parcelUpdatedAt: payload.parcel.parcelUpdatedAt,
                    pickupAddress: payload.parcel.pickupAddress,
                    pickupDistrict: payload.parcel.pickupDistrict,
                    pickupPostcode: payload.parcel.pickupPostcode,
                    pickupProvince: payload.parcel.pickupProvince,
                    pickupRound: payload.parcel.pickupRound,
                    pickupType: payload.parcel.pickupType,
                    receiverName: payload.parcel.receiverName,
                    receiverNo: payload.parcel.receiverNo,
                    senderName: payload.parcel.senderName,
                    senderNo: payload.parcel.senderNo,
                    serviceDate: payload.parcel.serviceDate,
                    status: payload.parcel.status,
                    temp: payload.parcel.temp,
                    trackingID: payload.parcel.trackingID,
                    userID: payload.parcel.userID,
                }),
            }).then(res => res.json());
        } catch (error) {
            context.commit('error', { error });
        }
    }
}