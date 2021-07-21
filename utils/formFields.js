const formFields = {
    meta: [{
        text: 'Order ID',
        value: 'orderID',
    },
    {
        text: 'Tracking ID',
        value: 'trackingID',
    },
    {
        text: 'Pickup Round',
        value: 'pickupRound',
    },
    {
        text: 'Size',
        value: 'parcelSize',
    },
    {
        text: 'COD',
        value: 'cod',
    },
    {
        text: 'Temp Control',
        value: 'temp',
    },
    {
        text: 'Service Date',
        value: 'orderDate',
        width: '7.5rem',
    },
    {
        text: 'Delivery Status',
        value: 'status',
    },
    {
        text: 'Parcel Type',
        value: 'parcelType',
    },
    ],
    sender: [{
        text: 'Sender Name',
        value: 'senderName',
        width: '12.5rem',
    },
    {
        text: 'Sender Phone',
        value: 'senderNo',
        width: '7rem',
    },
    {
        text: 'Sender Address',
        value: 'pickupAddress',
        width: '30rem',
    },
    {
        text: 'Sender District',
        value: 'pickupDistrict',
    },
    {
        text: 'Sender Postcode',
        value: 'pickupPostcode',
    },],
    receiver: [{
        text: 'Receiver Name',
        value: 'receiverName',
        width: '7.5rem',
    },
    {
        text: 'Receiver Phone',
        value: 'receiverNo',
        width: '7rem',
    },
    {
        text: 'Receiver Address',
        value: 'dropAddress',
        width: '30rem',
    },
    {
        text: 'Receiver District',
        value: 'dropDistrict',
    },
    {
        text: 'Receiver Postcode',
        value: 'dropPostcode',
    },],

}
export default formFields;