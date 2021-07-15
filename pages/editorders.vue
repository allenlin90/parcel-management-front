<template>
    <v-data-table
        :headers="headers"
        :items="entries"
        :items-per-page="10"
        class="elevation-1"
        :multiSort="true"
        :loading="showProgressBar"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Edit Orders</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.trackingId"
                                            label="Tracking ID"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.pickupRound"
                                            label="Pickup Round"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.size"
                                            label="Size"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.cod"
                                            label="COD"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.tempControl"
                                            label="Temp Control"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.serviceDate"
                                            label="Service Date"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.senderName"
                                            label="Sender Name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.senderPhone"
                                            label="Sender Phone"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.senderAddress"
                                            label="Sender Address"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.senderDistrict"
                                            label="Sender District"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.senderPostcode"
                                            label="Sender Postcode"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.receiverName"
                                            label="Receiver Name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.receiverPhone"
                                            label="Receiver Phone"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.receiverAddress"
                                            label="Receiver Address"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="
                                                editedItem.receiverDistrict
                                            "
                                            label="Receiver District"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="
                                                editedItem.receiverPostcode
                                            "
                                            label="Receiver Postcode"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.deliveryStatus"
                                            label="Delivery Status"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.parcelType"
                                            label="Parcel Type"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.edit="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
// import DragDrop from "../components/DragDrop.vue";
export default {
    components: {
        // DragDrop,
    },
    data() {
        return {
            headers: [],
            entries: [],
            dialog: false,
            editedIndex: -1,
            editedItem: {
                trackingId: '',
                pickupRound: 1,
                size: '',
                cod: 0,
                tempControl: 0,
                serviceDate: '',
                senderName: '',
                senderPhone: '',
                senderAddress: '',
                senderDistrict: '',
                senderPostcode: '',
                receiverName: '',
                receiverPhone: '',
                receiverAddress: '',
                receiverDistrict: '',
                receiverPostcode: '',
                deliveryStatus: '',
                parcelType: '',
            },
            defaultItem: {
                trackingId: '',
                pickupRound: 1,
                size: '',
                cod: 0,
                tempControl: 0,
                serviceDate: '',
                senderName: '',
                senderPhone: '',
                senderAddress: '',
                senderDistrict: '',
                senderPostcode: '',
                receiverName: '',
                receiverPhone: '',
                receiverAddress: '',
                receiverDistrict: '',
                receiverPostcode: '',
                deliveryStatus: '',
                parcelType: '',
            },
        }
    },
    watch: {
        dialog(val) {
            console.log(val)
            val || this.close()
        },
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        showProgressBar() {
            return this.entries.length === 0
        },
    },
    methods: {
        editItem(item) {
            console.log(item)
            this.editedIndex = this.entries.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async save() {
            if (this.editedIndex > -1) {
                setTimeout(() => {}, 500)
                Object.assign(this.entries[this.editedIndex], this.editedItem)
            } else {
                this.entries.push(this.editedItem)
            }
            this.close()
        },
    },
    mounted() {
        setTimeout(() => {
            this.headers = [
                {
                    text: 'Tracking ID',
                    align: 'start',
                    sortable: false,
                    value: 'trackingId',
                },
                {
                    text: 'Pickup Round',
                    align: 'start',
                    sortable: true,
                    value: 'pickupRound',
                },
                {
                    text: 'Size',
                    align: 'start',
                    sortable: true,
                    value: 'size',
                },
                {
                    text: 'COD',
                    align: 'start',
                    sortable: true,
                    value: 'cod',
                },
                {
                    text: 'Temp Control',
                    align: 'start',
                    sortable: true,
                    value: 'tempControl',
                },
                {
                    text: 'Service Date',
                    align: 'start',
                    sortable: true,
                    value: 'serviceDate',
                    width: '7.5rem',
                },
                {
                    text: 'Sender Name',
                    align: 'start',
                    sortable: false,
                    value: 'senderName',
                    width: '12.5rem',
                },
                {
                    text: 'Sender Phone',
                    align: 'start',
                    sortable: false,
                    value: 'senderPhone',
                    width: '7rem',
                },
                {
                    text: 'Sender Address',
                    align: 'start',
                    sortable: false,
                    value: 'senderAddress',
                    width: '30rem',
                },
                {
                    text: 'Sender District',
                    align: 'start',
                    sortable: false,
                    value: 'senderDistrict',
                },
                {
                    text: 'Sender Postcode',
                    align: 'start',
                    sortable: false,
                    value: 'senderPostcode',
                },
                {
                    text: 'Receiver Name',
                    align: 'start',
                    sortable: false,
                    value: 'receiverName',
                    width: '7.5rem',
                },
                {
                    text: 'Receiver Phone',
                    align: 'start',
                    sortable: false,
                    value: 'receiverPhone',
                    width: '7rem',
                },
                {
                    text: 'Receiver Address',
                    align: 'start',
                    sortable: false,
                    value: 'receiverAddress',
                    width: '30rem',
                },
                {
                    text: 'Receiver District',
                    align: 'start',
                    sortable: false,
                    value: 'receiverDistrict',
                },
                {
                    text: 'Receiver Postcode',
                    align: 'start',
                    sortable: false,
                    value: 'receiverPostcode',
                },
                {
                    text: 'Delivery Status',
                    align: 'start',
                    sortable: true,
                    value: 'deliveryStatus',
                },
                {
                    text: 'Parcel Type',
                    align: 'start',
                    sortable: true,
                    value: 'parcelType',
                },
                { text: 'Edit', value: 'edit', sortable: false },
            ]
            this.entries = [
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 500,
                    tempControl: 0,
                    serviceDate: '2021-07-31',
                    senderName: 'test sender 1 test sender 2 test sender 3',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 199,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 300,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 100,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 0,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
                {
                    trackingId: 'EX1234567890',
                    pickupRound: 1,
                    size: 'S100',
                    cod: 999,
                    tempControl: 0,
                    serviceDate: '2021-07-01',
                    senderName: 'test sender 1',
                    senderPhone: '0123456789',
                    senderAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                    senderDistrict: 'Bang Sue',
                    senderPostcode: '10800',
                    receiverName: 'test receiver 1',
                    receiverPhone: '9876543210',
                    receiverAddress:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                    receiverDistrict: 'Klong Toei',
                    receiverPostcode: '10100',
                    deliveryStatus: 'delivering',
                    parcelType: 'Bakery',
                },
            ]
        }, 2000)
    },
}
</script>

<style scoped>
</style>
