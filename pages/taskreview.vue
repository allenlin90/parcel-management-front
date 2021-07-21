<template>
    <section id="task_review">
        <v-dialog v-model="dialog" scrollable max-width="70%">
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
                                                v-for="field in formFields.meta"
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
                                        </v-row>
                                    </v-container>
                                    <!-- <v-container>
                                        <v-row>
                                            <v-col
                                                v-for="field in formFields.meta.slice(
                                                    0,
                                                    formFields.meta.length / 3
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
                                            <v-col
                                                v-for="field in formFields.meta.slice(
                                                    formFields.meta.length / 3,
                                                    (formFields.meta.length /
                                                        3) *
                                                        2
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
                                            <v-col
                                                v-for="field in formFields.meta.slice(
                                                    (formFields.meta.length /
                                                        3) *
                                                        2,
                                                    formFields.meta.length
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
                                    </v-container> -->
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
                                                            .length / 2
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
                                        <v-row>
                                            <v-col
                                                v-for="field in formFields.receiver.slice(
                                                    0,
                                                    Math.floor(
                                                        formFields.receiver
                                                            .length / 2
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
                                                            formFields
                                                                .receiver[2]
                                                                .text
                                                        }}
                                                    </h3>
                                                </v-row>
                                                <v-row>{{
                                                    parcelToUpdate[
                                                        formFields.receiver[2]
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
                                                v-for="field in formFields.receiver.slice(
                                                    Math.ceil(
                                                        formFields.receiver
                                                            .length / 2
                                                    ),
                                                    formFields.receiver.length
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
                        </v-expansion-panels>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="cancelEdit">Cancel</v-btn>
                    <v-btn color="primary" @click="updateParcel">Confirm</v-btn>
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
                        :item-text="tempOptions.text"
                        :item-value="tempOptions.value"
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
            fixed-header
            :footer-props="{
                'show-first-last-page': true,
                'items-per-page-options': [25, 50, 100, -1],
                'show-current-page': true,
            }"
        >
            <template v-slot:top>
                <v-progress-linear
                    v-if="loading"
                    indeterminate
                    color="blue"
                ></v-progress-linear>
            </template>
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
                        <td>{{ item.cod }}</td>
                        <td>
                            <v-simple-checkbox
                                :color="item.temp === 1 ? '#0288D1' : '#FF9800'"
                                :value="item.temp === 1 ? true : false"
                            ></v-simple-checkbox>
                        </td>
                        <td>{{ item.orderDate }}</td>
                        <td>{{ item.senderName }}</td>
                        <td>{{ item.senderNo }}</td>
                        <td>{{ item.pickupAddress }}</td>
                        <td>{{ item.pickupDistrict }}</td>
                        <td>{{ item.pickupPostcode }}</td>
                        <td>{{ item.receiverName }}</td>
                        <td>{{ item.receiverNo }}</td>
                        <td>{{ item.dropAddress }}</td>
                        <td>{{ item.dropDistrict }}</td>
                        <td>{{ item.dropPostcode }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.parcelType }}</td>
                    </tr>
                </tbody>
            </template>
            <!-- <template v-slot:footer="{ props }">
                <v-data-footer
                    :pagination="props.pagination"
                    :options="props.options"
                    items-per-page-text="$vuetify.dataTable.itemsPerPageText"
                    :showFirstLastPage="true"
                    :itemsPerPageOptions="props.itemsPerPageOptions"
                    :showCurrentPage="props.showCurrentPage"
                    @update:options="props.updateOptions"
                />
            </template> -->
            <template v-slot:footer.prepend>
                <div id="footer_btn">
                    <v-btn color="warning">Confirm Tasks</v-btn>
                    <v-btn color="error">Assign To Hubs</v-btn>
                </div>
            </template>
        </v-data-table>
    </section>
</template>

<script>
import headers from '../utils/headers.js'
import formFields from '../utils/formFields.js'
import sizes from '../utils/parcelSizes.js'

export default {
    data() {
        return {
            dialog: false,
            loading: false,
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
            parcelToUpdate: {
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
            },
            formFields,
        }
    },
    watch: {
        searchText(value) {
            console.log(value)
        },
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
        editParcel(parcel) {
            this.dialog = true
            this.parcelToUpdate = parcel
        },
        async updateParcel() {
            // await this.$store.dispatch('parcel/editParcel', this.editItem);
            setTimeout(() => {
                this.dialog = false
            }, 1500)
        },
        cancelEdit() {
            this.dialog = false
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
        this.loading = true

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

        // finish loading data
        this.loading = false

        // remove default footer from layout
        document.querySelector('footer.v-footer').style.display = 'none'
    },
}
</script>

<style lang="scss">
html {
    overflow-y: auto;
}
#app > div > main > div > #task_review > div > .v-data-table__wrapper {
    height: calc(100vh - 164px + 36px - 59px);
    overflow: auto;
}
#task_review
    > div.v-data-table.v-data-table--fixed-header.v-data-table--has-bottom.theme--light
    > div.v-data-footer
    > div.v-data-footer__select {
    margin-left: 1rem;
}
#footer_btn {
    margin-left: auto;
    order: 1;
}
</style>