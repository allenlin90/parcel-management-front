<template>
    <section id="task_review">
        <v-dialog v-model="loadingDialog" max-width="50%"> </v-dialog>
        <v-dialog v-model="editDialog" scrollable max-width="70%">
            <v-card>
                <v-card-title>Edit Parcel</v-card-title>
                <v-card-text>
                    <v-form @submit.prevent>
                        <v-expansion-panels v-model="editPanel" multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2>Order Info.</h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                v-for="field in formFields.meta.slice(
                                                    0,
                                                    formFields.meta.length - 1
                                                )"
                                                :key="field.value"
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                lg="3"
                                                class="mb-3"
                                            >
                                                <v-row>
                                                    <h3>{{ field.text }}</h3>
                                                </v-row>
                                                <v-row>{{
                                                    parcelToUpdate[field.value]
                                                }}</v-row>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                lg="3"
                                                class="mb-3"
                                            >
                                                <v-row
                                                    ><h3>
                                                        Size
                                                        <v-icon
                                                            @click="editSize"
                                                            v-if="!editingSize"
                                                            >mdi-square-edit-outline</v-icon
                                                        >
                                                        <v-icon
                                                            @click="editSize"
                                                            v-else
                                                            >mdi-check</v-icon
                                                        >
                                                    </h3></v-row
                                                >
                                                <v-row>
                                                    <v-select
                                                        :items="sizes"
                                                        :readonly="!editingSize"
                                                        :append-icon="
                                                            !editingSize
                                                                ? ''
                                                                : '$dropdown'
                                                        "
                                                        v-model="
                                                            parcelToUpdate.parcelSize
                                                        "
                                                        dense
                                                    ></v-select>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2>Sender Info.</h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                v-for="field in formFields.sender.slice(
                                                    0,
                                                    Math.floor(
                                                        formFields.sender
                                                            .length / 3
                                                    )
                                                )"
                                                :key="field.value"
                                            >
                                                <v-row>
                                                    <h3>
                                                        {{ field.text }}
                                                    </h3>
                                                </v-row>
                                                <v-row>{{
                                                    parcelToUpdate[field.value]
                                                }}</v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <br />
                                            <br />
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-row>
                                                    <h3>
                                                        {{
                                                            formFields.sender[2]
                                                                .text
                                                        }}
                                                    </h3>
                                                </v-row>
                                                <v-row>{{
                                                    parcelToUpdate[
                                                        formFields.sender[2]
                                                            .value
                                                    ]
                                                }}</v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <br />
                                            <br />
                                        </v-row>
                                        <v-row>
                                            <v-col
                                                v-for="field in formFields.sender.slice(
                                                    Math.ceil(
                                                        formFields.sender
                                                            .length / 2
                                                    ),
                                                    formFields.sender.length
                                                )"
                                                :key="field.value"
                                            >
                                                <v-row>
                                                    <h3>
                                                        {{ field.text }}
                                                    </h3>
                                                </v-row>
                                                <v-row>{{
                                                    parcelToUpdate[field.value]
                                                }}</v-row>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <h2>Receiver Info.</h2>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-container>
                                        <v-row justify="space-between">
                                            <v-col
                                                v-for="field in formFields.receiver.slice(
                                                    0,
                                                    Math.floor(
                                                        formFields.receiver
                                                            .length / 3
                                                    )
                                                )"
                                                :key="field.value"
                                                cols="12"
                                                sm="5"
                                            >
                                                <v-row>
                                                    <v-text-field
                                                        :disabled="!editing"
                                                        v-model="
                                                            parcelToUpdate[
                                                                field.value
                                                            ]
                                                        "
                                                        required
                                                        :label="field.text"
                                                        clearable
                                                    >
                                                    </v-text-field>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-row>
                                                    <v-textarea
                                                        :label="
                                                            formFields
                                                                .receiver[2]
                                                                .text
                                                        "
                                                        auto-grow
                                                        :readonly="!editing"
                                                        v-model="
                                                            parcelToUpdate[
                                                                formFields
                                                                    .receiver[2]
                                                                    .value
                                                            ]
                                                        "
                                                        rows="2"
                                                        required
                                                        :clearable="editing"
                                                    >
                                                    </v-textarea>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-select
                                                    :label="
                                                        formFields.receiver[3]
                                                            .text
                                                    "
                                                    :readonly="!editing"
                                                    v-model="
                                                        parcelToUpdate.dropProvince
                                                    "
                                                    :items="provinces"
                                                    item-text="name"
                                                    item-value="id"
                                                    solo
                                                    @change="districtList"
                                                ></v-select>
                                            </v-col>
                                            <v-col>
                                                <v-select
                                                    :label="
                                                        formFields.receiver[4]
                                                            .text
                                                    "
                                                    :readonly="
                                                        !editing || !districts.length
                                                    "
                                                    v-model="
                                                        parcelToUpdate.dropDistrict
                                                    "
                                                    :items="districts"
                                                    item-text="name"
                                                    item-value="id"
                                                    solo
                                                ></v-select>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                    :disabled="!editing"
                                                    v-model="
                                                        parcelToUpdate[
                                                            formFields
                                                                .receiver[5]
                                                                .value
                                                        ]
                                                    "
                                                    required
                                                    :label="
                                                        formFields.receiver[5]
                                                            .text
                                                    "
                                                    clearable
                                                >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center">
                                            <v-btn
                                                v-if="!editing"
                                                color="primary"
                                                @click.prevent="startEdit"
                                                transition="fade-transition"
                                                >Edit
                                                <v-icon
                                                    >mdi-square-edit-outline</v-icon
                                                >
                                            </v-btn>
                                            <div v-else>
                                                <v-btn
                                                    color="secondary"
                                                    @click="startEdit"
                                                    >Cancel</v-btn
                                                >
                                                <v-btn
                                                    color="primary"
                                                    @click="updateParcel"
                                                    >Confirm</v-btn
                                                >
                                            </div>
                                        </v-row>
                                    </v-container>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" @click="cancelEdit">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-app-bar fixed app style="top: 64px; padding-top: 0.5rem">
            <v-toolbar-title>Filters</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-row>
                <v-col cols="5">
                    <v-select
                        :items="filters"
                        hint="Select Filter"
                        v-model="searchFilter"
                        :full-width="false"
                    >
                    </v-select>
                </v-col>
                <v-col cols="5">
                    <v-select
                        v-if="searchFilter === 'temp'"
                        :items="tempOptions"
                        v-model.trim="searchText"
                    ></v-select>
                    <v-select
                        v-else-if="searchFilter === 'unmatchPostcodes'"
                        :items="unmatchOptions"
                        v-model.trim="searchText"
                    ></v-select>
                    <v-combobox
                        v-else-if="searchFilter === 'parcelSize'"
                        v-model.trim="searchText"
                        :items="sizes"
                        multiple
                        chips
                    ></v-combobox>
                    <v-text-field
                        v-else
                        v-model.trim="searchText"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-btn color="primary" @click="clearFilters">Clear</v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
        <div style="height: 64px"></div>
        <v-data-table
            :headers="headers"
            :items="filteredParcels"
            item-key="id"
            :items-per-page="25"
            :show-select="false"
            :single-select="false"
            :hide-default-header="false"
            :hide-default-footer="false"
            :multi-sort="true"
            :fixed-header="true"
            :loading="tableLoading"
            :loading-text="'Loading... Please wait'"
            :header-props="{
                mobile: true,
            }"
            :footer-props="{
                'show-first-last-page': true,
                'items-per-page-options': [25, 50, 100, -1],
                'show-current-page': true,
            }"
        >
            <template v-slot:body="{ items }">
                <tbody>
                    <tr v-for="(item, index) in items" :key="item.trackingId">
                        <td>
                            <v-icon
                                small
                                class="mr-2"
                                @click="editParcel(item)"
                            >
                                mdi-pencil
                            </v-icon>
                        </td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.orderID }}</td>
                        <td>{{ item.trackingID }}</td>
                        <td style="white-space: nowrap">
                            {{ pickupRound(item.pickupRound) }}
                        </td>
                        <td>{{ item.parcelSize }}</td>
                        <td>
                            <v-simple-checkbox
                                :color="item.temp === 1 ? '#0288D1' : '#FF9800'"
                                :value="item.temp === 1 ? true : false"
                            ></v-simple-checkbox>
                        </td>
                        <td>
                            <div
                                class="cod_style"
                                :class="{ has_cod: item.cod > 0 }"
                            >
                                {{ item.cod }}
                            </div>
                        </td>
                        <td>{{ item.orderDate }}</td>
                        <td>{{ item.senderName }}</td>
                        <td>{{ item.senderNo }}</td>
                        <td class="text_overflow">{{ item.pickupAddress }}</td>
                        <td>{{ item.pickupDistrict }}</td>
                        <td>{{ item.pickupProvince }}</td>
                        <td>{{ item.pickupPostcode }}</td>
                        <td>{{ item.receiverName }}</td>
                        <td>{{ item.receiverNo }}</td>
                        <td class="text_overflow">{{ item.dropAddress }}</td>
                        <td>{{ item.dropDistrict }}</td>
                        <td>{{ item.dropProvince }}</td>
                        <td>
                            <div
                                :class="{
                                    unmatch_postcode: !isPostcodeMatch(
                                        item.trackingID
                                    ),
                                }"
                            >
                                {{ extractPostcode(item.trackingID) }}/{{
                                    item.dropPostcode
                                }}
                            </div>
                        </td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.parcelType }}</td>
                    </tr>
                </tbody>
            </template>
            <template v-slot:footer.prepend>
                <div id="footer_btn">
                    <v-btn color="warning" @click="confirmRoundTasks"
                        >Confirm Tasks</v-btn
                    >
                    <v-btn color="error" @click="assignToHubs"
                        >Assign To Hubs</v-btn
                    >
                </div>
            </template>
        </v-data-table>
    </section>
</template>

<script>
import headers from '../utils/headers.js'
import formFields from '../utils/formFields.js'
import sizes from '../utils/parcelSizes.js'
import tasks from '../utils/parcelTasks.js'

export default {
    props: {
        dropoffRound: {
            type: String,
            default: '1',
            required: false, // this should be true in production
        },
    },
    data() {
        return {
            editDialog: false, 
            loadingDialog: false,
            tableLoading: false,
            editing: false,
            editingSize: false,
            panel: [0],
            editPanel: [0, 1, 2],
            tasks: [],
            headers: [],
            sizes: [],
            searchFilter: '',
            searchText: '',
            hubs: [],
            tempOptions: [
                { text: 'Yes', value: '1' },
                { text: 'No', value: '0' },
            ],
            unmatchOptions: [
                { text: 'Match', value: '1' },
                { text: 'Not Match', value: '0' },
            ],
            parcelToUpdate: {
                orderID: 'MS01234567890123',
                trackingID: 'EX0000000001',
                pickupRound: 1,
                parcelSize: 's100',
                cod: 500,
                temp: 0,
                orderDate: '2021-07-31',
                senderName: 'test sender 1 test sender 2 test sender 3',
                senderNo: '0123456789',
                pickupAddress:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Bang Sue, 10800',
                pickupDistrict: 'Bang Sue',
                pickupProvince: 'Bangkok',
                pickupPostcode: '10800',
                receiverName: 'test receiver 1',
                receiverNo: '9876543210',
                dropAddress:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sed sint provident sequi eligendi aut veritatis, Klong Toei, 10110',
                dropDistrict: 'Klong Toei',
                dropProvince: 'Bangkok',
                dropPostcode: '10110',
                status: 'delivering',
                parcelType: 'Bakery',
            },
            formFields,
            provinces: [],
            districts: [],
        }
    },
    computed: {
        filters() {
            const filters = this.headers.filter((header) => {
                if (
                    header.text !== '#' &&
                    header.text !== 'Remove' &&
                    header.text !== 'Edit'
                )
                    return true
                return false
            })
            filters.push({
                text: 'Unmatch Postcodes',
                value: 'unmatchPostcodes',
            })
            return filters
        },
        filteredParcels() {
            if (this.searchFilter && this.searchText && this.tasks.length) {
                const filteredTasks = this.tasks.filter((task) => {
                    try {
                        let validation = false
                        const value = task[this.searchFilter]
                        switch (this.searchFilter) {
                            case 'orderID':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'trackingID':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'pickupRound':
                                parseInt(value) === parseInt(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'parcelSize':
                                const sizes = this.searchText.map((size) =>
                                    size.toLowerCase()
                                )
                                sizes.includes(value.toLowerCase())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'temp':
                                console.log('value')
                                console.log(value)
                                value.toString() === this.searchText.toString()
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'orderDate':
                                value
                                    .toString()
                                    .includes(this.searchText.toString())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'senderName':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'senderNo':
                                value
                                    .toString()
                                    .includes(this.searchText.toString())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'pickupAddress':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'pickupDistrict':
                                value
                                    .toLowerCase()
                                    .includes(this.searchText.toLowerCase())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'pickupPostcode':
                                value
                                    .toString()
                                    .includes(this.searchText.toString())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'receiverName':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'receiverNo':
                                value
                                    .toString()
                                    .includes(this.searchText.toString())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'dropAddress':
                                value.includes(this.searchText)
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'dropDistrict':
                                value
                                    .toLowerCase()
                                    .includes(this.searchText.toLowerCase())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'dropPostcode':
                                value
                                    .toString()
                                    .includes(this.searchText.toString())
                                    ? (validation = true)
                                    : (validation = false)
                                break
                            case 'cod':
                                if (parseInt(this.searchText) > 0) {
                                    parseInt(value) >= parseInt(this.searchText)
                                        ? (validation = true)
                                        : (validation = false)
                                } else {
                                    !parseInt(value)
                                        ? (validation = true)
                                        : (validation = false)
                                }
                                break
                            case 'unmatchPostcodes':
                                if (this.searchText.toString() === '1') {
                                    this.isPostcodeMatch(task.trackingID)
                                        ? (validation = true)
                                        : (validation = false)
                                } else if (this.searchText.toString() === '0') {
                                    !this.isPostcodeMatch(task.trackingID)
                                        ? (validation = true)
                                        : (validation = false)
                                }
                                break
                        }
                        return validation
                    } catch (error) {
                        return false
                    }
                })
                if (filteredTasks.length) {
                    return filteredTasks
                } else {
                    return []
                }
            }
            return this.tasks
        },
    },
    methods: {
        async districtList() {
            if (!Number.isNaN(parseInt(this.parcelToUpdate.dropProvince))) {
                const districtsLoaded = await this.$store.dispatch('serviceArea/districts', {provinceID: parseInt(this.parcelToUpdate.dropProvince)})
                if (districtsLoaded) {
                    this.districts = this.$store.getters['serviceArea/districts'];
                } else {
                    this.districts = [];
                }
            } else {
                this.districts = [];
            }
        },
        editSize() {
            this.editingSize = !this.editingSize
        },
        startEdit() {
            this.editing = !this.editing
        },
        confirmRoundTasks() {
            console.log(this.dropoffRound)
        },
        async assignToHubs() {
            await this.$store.dispatch('hub/assignToHubs', {
                round: this.dropoffRound,
            })
        },
        isPostcodeMatch(trackingId) {
            const taskToParse = this.tasks.find(
                (task) => task.trackingID === trackingId
            )
            return (
                taskToParse.dropPostcode === this.extractPostcode(trackingId) ||
                taskToParse.dropPostcode.toString() === '00000'
            )
        },
        extractPostcode(trackingId) {
            const taskToParse = this.tasks.find(
                (task) => task.trackingID === trackingId
            )
            try {
                const address = taskToParse.dropAddress
                const parsedPostcode = /\b\d{5}\b/g.exec(address)
                if (parsedPostcode) {
                    if (taskToParse.dropPostcode === parsedPostcode[0])
                        return taskToParse.dropPostcode
                    return parsedPostcode[0]
                }
                return taskToParse.dropPostcode
            } catch (error) {
                console.log(error)
                return taskToParse.dropPostcode
            }
        },
        async editParcel(parcel) {
            this.editDialog = true
            this.parcelToUpdate = Object.assign({}, parcel)
            await this.districtList()
        },
        async updateParcel() {
            // await this.$store.dispatch('parcel/editParcel', this.editItem);
            setTimeout(() => {
                this.editDialog = false
            }, 1500)
        },
        cancelEdit() {
            this.editDialog = false
            this.parcelToUpdate = {
                orderID: '',
                trackingID: '',
                orderDate: '',
                temp: 0,
                cod: 0,
                parcelSize: '',
                senderName: '',
                senderNo: '',
                pickupAddress: '',
                pickupDistrict: '',
                pickupPostcode: '',
                receiverName: '',
                receiverNo: '',
                dropAddress: '',
                dropDistrict: '',
                dropPostcode: '',
                status: '',
                parcelType: '',
            }
        },
        clearFilters() {
            this.searchFilter = ''
            this.searchText = ''
        },
        pickupRound(round) {
            let text = ''
            switch (round) {
                case 1:
                    text = '08:00-10:00'
                    break
                case 2:
                    text = '10:00-12:00'
                    break
                case 3:
                    text = '12:00-14:00'
                    break
                case 4:
                    text = '08:00-10:00'
                    break
                case 5:
                    text = '10:00-12:00'
                    break
                case 6:
                    text = '12:00-14:00'
                    break
                default:
                    text = 'Unknown'
            }
            return text
        },
    },
    beforeMount() {
        document.querySelector('footer.v-footer').style.display = 'none'
    },
    async mounted() {
        this.tableLoading = true

        // import districts
        this.districts = this.$store.getters['serviceArea/districts']

        // import provinces
        const provincesLoaded = await this.$store.dispatch('serviceArea/provinces');
        if (provincesLoaded) {
            this.provinces = this.$store.getters['serviceArea/provinces']
        }

        // set up sizes
        this.sizes = sizes

        // set up table headers
        this.headers = headers.filter(
            (header) => header.value !== 'remove' && header.text
        )
        this.headers.unshift({
            text: 'Edit',
            align: 'start',
            value: 'edit',
            sortable: false,
        })

        // set up form fields
        this.formFields = formFields

        // fetch all hubs
        const hubLoaded = await this.$store.dispatch('hub/hub')
        if (hubLoaded) {
            this.hubs = this.$store.getters['hub/hubs']
        }

        // fetch parcels of the working date
        const now = new Date()
        const today = `${now.getFullYear()}-${
            now.getMonth() + 1
        }-${now.getDate()}`
        const parcelLoaded = await this.$store.dispatch('parcel/getParcels', {
            serviceDate: today,
        })
        if (parcelLoaded) {
            this.tasks = this.$store.getters['parcel/parcels']
            // this.tasks = this.$store.getters['parcel/firstRoundParcels']
        }

        // this.tasks = tasks // this is for testing with local tasks

        // finish loading data
        this.tableLoading = false

        // remove default footer from layout
        document.querySelector('footer.v-footer').style.display = 'none'

        // set up dragscroll on x axis
        const slider = document.querySelector(
            '#app > div > main > div > #task_review > div > .v-data-table__wrapper'
        )
        let isDown = false
        let startX
        let scrollLeft

        slider.addEventListener('mousedown', (e) => {
            isDown = true
            slider.style.cursor = 'grabbing'
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        })
        slider.addEventListener('mouseleave', () => {
            isDown = false
            slider.style.cursor = 'grab'
        })
        slider.addEventListener('mouseup', () => {
            isDown = false
            slider.style.cursor = 'grab'
        })
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const walk = (x - startX) * 3 //scroll-fast
            slider.scrollLeft = scrollLeft - walk
        })
    },
}
</script>

<style lang="scss">
$banner-color: #777;
$white-color: #fff;

html {
    overflow-y: hidden;
}
#app > div > main > div > #task_review > .v-data-table {
    background-color: $banner-color;
    .v-data-table__wrapper {
        background-color: $white-color;
        height: calc(100vh - 164px + 36px - 56px);
        overflow: auto;
        // padding-left: 1rem;
        cursor: grab;
    }

    @media (max-width: 960px) {
        .v-data-table__wrapper {
            height: calc(100vh - 164px + 36px - 48px);
        }
    }
}
#task_review {
    &
        > div.v-data-table.v-data-table--fixed-header.v-data-table--has-bottom.theme--light
        > div.v-data-footer
        > div.v-data-footer__select {
        margin-left: 1rem;
    }

    table thead > tr > th {
        background: $banner-color;
        color: $white-color;
        font-size: 1.05rem;
        font-weight: bold;
        white-space: nowrap;
        text-align: center;
        & > i,
        & > span:nth-child(3) {
            color: #ccc;
        }
    }

    .v-simple-checkbox {
        display: flex;
        justify-content: center;
    }
    .v-data-footer {
        background: $banner-color;
        color: $white-color;
        i,
        div,
        button,
        input {
            color: $white-color;
            &::before,
            &::after {
                color: $white-color;
                border-color: $white-color;
            }
        }
    }
    #footer_btn {
        margin-left: auto;
        order: 1;
    }
    .cod_style {
        text-align: center;
    }
    .has_cod {
        background-color: orange;
        color: #000;
        padding: 0.2rem;
        border-radius: 5px;
    }
    .text_overflow {
        overflow: auto;
    }
    .unmatch_postcode {
        display: inline-block;
        background-color: #bf0000;
        color: $white-color;
        padding: 0.2rem;
        border-radius: 5px;
    }
    .edit_input {
        border-style: inset;
    }
}
</style>