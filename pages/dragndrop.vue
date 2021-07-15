<template>
    <section>
        <div class="simple-page">
            <v-data-table
                :headers="headers"
                :items="items3"
                :items-per-page="10"
                class="elevation-1"
                :multiSort="true"
                :loading="showProgressBar"
            >
                <template v-slot:body="{ items }">
                    <Container
                        :group-name="hub"
                        @drop="onDrop('items3', $event)"
                        :get-child-payload="getChildPayload1"
                        orientation="vertical"
                        tag="tbody"
                    >
                        <Draggable
                            v-for="item in items"
                            :key="item.trackingId"
                            tag="tr"
                            class="draggable-item"
                        >
                            <td>{{ item.trackingId }}</td>
                            <td>{{ item.pickupRound }}</td>
                            <td>{{ item.size }}</td>
                            <td>{{ item.cod }}</td>
                            <td>{{ item.tempControl }}</td>
                            <td>{{ item.serviceDate }}</td>
                            <td>{{ item.senderName }}</td>
                            <td>{{ item.senderPhone }}</td>
                            <td>{{ item.senderAddress }}</td>
                            <td>{{ item.senderDistrict }}</td>
                            <td>{{ item.senderPostcode }}</td>
                            <td>{{ item.receiverName }}</td>
                            <td>{{ item.receiverPhone }}</td>
                            <td>{{ item.receiverAddress }}</td>
                            <td>{{ item.receiverDistrict }}</td>
                            <td>{{ item.receiverPostcode }}</td>
                            <td>{{ item.deliveryStatus }}</td>
                            <td>{{ item.parcelType }}</td>
                        </Draggable>
                    </Container>
                </template>
            </v-data-table>
            <v-container class="fill-width">
                <v-row class="flex-nowrap">
                    <v-col v-for="header in headers" :key="header.value">
                        {{ header.value }}
                    </v-col>
                </v-row>
                <v-row class="flex-nowrap">
                    <Container
                        :group-name="hub"
                        @drop="onDrop('items1', $event)"
                        :get-child-payload="getChildPayload1"
                        orientation="vertical"
                    >
                        <Draggable v-for="item in items1" :key="item.id">
                            <div class="draggable-item">
                                <v-row class="flex-nowrap">
                                    <v-col
                                        v-for="header in headers"
                                        :key="header.value + '0'"
                                    >
                                        {{ header.value }}
                                    </v-col>
                                </v-row>
                            </div>
                        </Draggable>
                    </Container>
                </v-row>
            </v-container>
            <v-container class="fill-width">
                <v-row class="flex-nowrap">
                    <v-col v-for="header in headers" :key="header.value + '2'">
                        {{ header.value }}
                    </v-col>
                </v-row>
                <v-row class="flex-nowrap">
                    <Container
                        :group-name="hub"
                        @drop="onDrop('items2', $event)"
                        :get-child-payload="getChildPayload1"
                        orientation="vertical"
                    >
                        <Draggable v-for="item in items2" :key="item.id + '2'">
                            <div class="draggable-item">
                                <v-row class="flex-nowrap">
                                    <v-col
                                        v-for="header in headers"
                                        :key="header.value + '5'"
                                    >
                                        {{ header.value }}
                                    </v-col>
                                </v-row>
                            </div>
                        </Draggable>
                    </Container>
                </v-row>
            </v-container>
            <!-- <v-container>
                <v-row>
                    <Container
                        :group-name="hub"
                        @drop="onDrop('items2', $event)"
                        :get-child-payload="getChildPayload2"
                        orientation="vertical"
                    >
                        <Draggable v-for="item in items2" :key="item.id">
                            <div class="draggable-item">
                                {{ item.data }}
                            </div>
                        </Draggable>
                    </Container>
                </v-row>
            </v-container> -->
        </div>
    </section>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../utils/helpers.js'
export default {
    name: 'Simple',
    components: { Container, Draggable },
    data() {
        return {
            items1: generateItems(10, (i) => ({
                id: '1' + i,
                data: 'Draggable 1 - ' + i,
            })),
            items2: generateItems(5, (i) => ({
                id: '2' + i,
                data: 'Draggable 2 - ' + i,
            })),
            items3: [],
            hub: 'dmk',
            headers: [
                'trackingId',
                'pickupRound',
                'size',
                'cod',
                'tempControl',
                'serviceDate',
                'senderName',
                'senderPhone',
                'senderAddress',
                'senderDistrict',
                'senderPostcode',
                'receiverName',
                'receiverPhone',
                'receiverAddress',
                'receiverDistrict',
                'receiverPostcode',
                'deliveryStatus',
                'parcelType',
            ],
        }
    },
    computed: {
        showProgressBar() {
            return this.items3.length === 0
        },
    },
    methods: {
        onDrop(collection, dropResult) {
            this[collection] = applyDrag(this[collection], dropResult)
        },
        getChildPayload1(index) {
            return this.items1[index]
        },
        getChildPayload2(index) {
            return this.items2[index]
        },
        editItem(item) {
            console.log(item)
            this.editedIndex = this.entries.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
    },
    mounted() {
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
        this.items3 = [
            {
                trackingId: 'EX0000000001',
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
                trackingId: 'EX0000000002',
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
                trackingId: 'EX0000000003',
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
                trackingId: 'EX0000000004',
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
                trackingId: 'EX0000000005',
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
                trackingId: 'EX0000000006',
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
                trackingId: 'EX0000000007',
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
                trackingId: 'EX0000000008',
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
                trackingId: 'EX0000000009',
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
                trackingId: 'EX0000000010',
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
                trackingId: 'EX0000000011',
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
                trackingId: 'EX0000000012',
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
                trackingId: 'EX0000000013',
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
                trackingId: 'EX0000000014',
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
                trackingId: 'EX0000000015',
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
                trackingId: 'EX0000000016',
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
                trackingId: 'EX0000000017',
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
                trackingId: 'EX0000000018',
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
    },
}
</script>

<style scoped lang="scss">
.fill-width {
    overflow: auto;
    flex-wrap: nowrap;
}
</style>