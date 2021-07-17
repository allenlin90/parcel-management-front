<template>
    <section>
        <v-app-bar fixed app style="top: 56px; overflow: auto" color="#616161">
            <v-container>
                <v-row>
                    <v-col class="text_white">Total Tasks: {{ this.tasks.length + this.assignedTasks }}</v-col>
                    <v-col class="text_white">Unassigned Tasks: {{ this.tasks.length }}</v-col>
                    <v-col class="text_white">Assigned Tasks: {{ this.assignedTasks }}</v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <div style="height: 56px;"></div>
        <v-row>
            <br>
        </v-row>
        <v-row>
            <v-card>
                <v-card-title>
                    Unassigned Tasks
                    <v-spacer></v-spacer>
                    <v-row>
                        <!-- <label for="select_driver" style="display: block; margin-right: 1rem;">Select a Driver</label> -->
                        <v-col align-self="center">
                            <v-select
                                id="select_driver"
                                :items="drivers"
                                item-text="name"
                                item-value="id"
                                hint="Select Driver"
                                return-object
                                v-model="selectedDriver"
                                :full-width="false"
                                >
                            </v-select>
                        </v-col>
                        <v-col align-self="center">
                            <v-btn
                                class="ma-2"
                                :loading="loading"
                                :disabled="loading"
                                color="primary"
                                @click="assignToDriver"
                                >
                                Assign
                            </v-btn>
                        </v-col>
                        <!-- <v-spacer></v-spacer> -->
                        <v-col align-self="center">
                            <div>Selected Tasks: {{ countSelectedTasks }}</div>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="tasks"
                    item-key="id"
                    :show-select="false"
                    :single-select="false"
                    :disable-pagination="true"
                    :hide-default-footer="true"
                    :loading="showProgressBar"
                >
                    <template v-slot:top>
                        <v-toolbar flat >
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
                                        <v-text-field
                                            v-model="searchText"
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
                        </v-toolbar>
                    </template>

                    <template v-slot:header.select>
                        <input type="checkbox" @change="selectAllTasks" :checked="selectAll">
                    </template>
                    <template v-slot:header.remove>
                    </template>
                    <template v-slot:body>
                        <draggable
                        :list="tasks"
                        :group="hub"
                        tag="tbody"
                        @start="drag=true" @end="drag=false"
                        >
                        <tr
                            v-for="(item, index) in tasks"
                            :key="index"
                            @click="selectParcel(item.trackingId)"
                            :style="{display: filteredParcels.includes(item.trackingId) ? '' : 'none'}"
                        >
                            <td>
                                <input type="checkbox" :checked="item.checked" @change="selectParcel(item.trackingId)">
                            </td>
                            <td> {{ index + 1 }} </td>
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
                            <td></td>
                            <td></td>
                        </tr>
                        </draggable>
                    </template>
                </v-data-table>
            </v-card>
        </v-row>
        <!-- all drivers of the hub -->
        <v-row>
            <br>
        </v-row>
        <v-row>
            <v-data-table
                v-for="driver in drivers"
                :headers="headers"
                :items="driver.tasks"
                item-key="id"
                :show-select="false"
                :disable-pagination="true"
                :hide-default-footer="true"
                :key="driver.id"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-row>
                            <v-col cols="4">
                                <v-toolbar-title>{{driver.name}}</v-toolbar-title>
                                <v-divider
                                class="mx-4"
                                inset
                                vertical
                                ></v-divider>
                            </v-col>
                            <!-- <v-spacer></v-spacer> -->
                            <v-col cols="8">
                                <v-row>
                                    <v-col cols="4">
                                        Assigned Tasks: {{ driver.tasks.length }}
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn color="error" @click="clearDriverTasks(driver.id)">Clear Tasks</v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn color="primary" @click="confirmDriverTasks">Confirm Tasks</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-toolbar>
                </template>
                <template v-slot:body>
                    <draggable
                    :list="driver.tasks"
                    :group="hub"
                    tag="tbody"
                    @start="drag=true" @end="drag=false"
                    >
                    <tr
                        v-for="(item, index) in driver.tasks"
                        :key="index"
                    >
                        
                        <td>
                        <v-icon
                            small
                            class="page__grab-icon"
                        >
                            mdi-arrow-all
                        </v-icon>
                        </td>
                        <td> {{ index + 1 }} </td>
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
                        <td>
                        <v-icon
                            small
                            @click="removeTask(item.trackingId, driver.id)"
                        >
                            mdi-pencil
                        </v-icon>
                        </td>
                    </tr>
                    </draggable>
                </template>
                <template v-slot:footer>
                    <br>
                </template>
            </v-data-table>
        </v-row>
    </section>
</template>

<script>
import draggable from 'vuedraggable';
import tasks from '../utils/parcelTasks.js';
import headers from '../utils/headers.js';
import ContextMenu from '../components/ContextMenu.vue';

export default {
    components: {draggable,},
    props:{
        hub: {
            default: 'dmk',
            type: String,
            // required: true, // this is required in production
        },
    },
    data() {
        return {
            headers: [],
            drivers: [],
            tasks: [],
            searchFilter: '',
            searchText: '',
            selectedDriver: '',
            selectAll: false,
            loading: false,
            tableLoading: false,
        }
    },
    computed: {
        filters() {
            const filters = this.headers.filter(header => {
                if (header.text !== '#' && header.text !== 'Remove') return true;
                return false;
            });
            return filters;
        },
        driverList() {
            return this.drivers.map(driver => driver.name);
        },
        assignedTasks() {
            const countAssignedTasks = this.drivers.reduce(((sumTasks, driver) => {
                sumTasks += driver.tasks.length;
                return sumTasks;
            }), 0);
            return countAssignedTasks;
        },
        showProgressBar() {
            return !this.tasks.length
        },
        countSelectedTasks() {
            return this.tasks.filter(task => task.checked).length;
        },
        filteredParcels() {
            if (this.searchFilter && this.searchText && this.tasks.length) {
                const filteredTasks = this.tasks.filter(task => {
                    try {
                        let validation = false;
                        const value = task[this.searchFilter];
                        switch (this.searchFilter) {
                            case 'trackingId':
                                value.includes(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'pickupRound': 
                                parseInt(value) === parseInt(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'size':
                                value.toLowerCase().includes(this.searchText.toLowerCase()) ? validation = true : validation = false;
                                break;
                            case 'tempControl': 
                                value.toString() === this.searchText.toString() ? validation = true : validation = false;
                                break;
                            case 'senderName':
                                value.includes(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'senderPhone':
                                value.toString().includes(this.searchText.toString()) ? validation = true : validation = false;
                                break;
                            case 'senderAddress':
                                value.includes(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'senderDistrict':
                                value.toLowerCase().includes(this.searchText.toLowerCase()) ? validation = true : validation = false;
                                break;
                            case 'senderPostcode': 
                                value.toString().includes(this.searchText.toString()) ? validation = true : validation = false;
                                break;
                            case 'receiverName':
                                value.includes(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'receiverPhone':
                                value.toString().includes(this.searchText.toString()) ? validation = true : validation = false;
                                break;
                            case 'receiverAddress':
                                value.includes(this.searchText) ? validation = true : validation = false;
                                break;
                            case 'receiverDistrict':
                                value.toLowerCase().includes(this.searchText.toLowerCase()) ? validation = true : validation = false;
                                break;
                            case 'receiverPostcode': 
                                value.toString().includes(this.searchText.toString()) ? validation = true : validation = false;
                                break;
                            case 'cod':
                                if (parseInt(this.searchText) > 0) {
                                    parseInt(value) >= parseInt(this.searchText) ? validation = true : validation = false;
                                } else {
                                    !parseInt(value) ? validation = true : validation = false;
                                }
                                break;
                            case 'trackingId':
                                break;
                        }
                        return validation;
                    } catch (error) {
                        return false;
                    }
                })
                if (filteredTasks.length) {
                    return filteredTasks.map(task => task.trackingId);
                } else {
                    return [];
                }
            }
            return this.tasks.map(task => task.trackingId);
        },
    },
    methods: {
        assignToDriver() {
            const tasks = this.tasks.filter(task => task.checked).map(task => {
                task.checked = false;
                return task;
            });
            const allTrackingId = tasks.map(task => task.trackingId);
            this.tasks = this.tasks.filter(task => !allTrackingId.includes(task.trackingId));
            const driverIndex = this.drivers.findIndex(driver => driver.id === this.selectedDriver.id);
            this.drivers[driverIndex].tasks = [...this.drivers[driverIndex].tasks, ...tasks];
            this.selectAll = false;
        },
        removeTask(trackingId, driverId) {
            const driverIndex = this.drivers.findIndex(driver => driver.id === driverId);
            const task = this.drivers[driverIndex].tasks.find(task => task.trackingId === trackingId);
            const taskIndex = this.drivers[driverIndex].tasks.findIndex(task => task.trackingId === trackingId);
            this.drivers[driverIndex].tasks.splice(taskIndex, 1);
            this.tasks.push(task);
        },
        clearDriverTasks(driverId) {
            const driverIndex = this.drivers.findIndex(driver => driver.id === driverId);
            this.tasks = [...this.tasks, ...this.drivers[driverIndex].tasks];
            this.drivers[driverIndex].tasks = [];
        },
        async confirmDriverTasks(driverId) {
            console.log(`confirm tasks for driver ${driverId}`);
        },
        selectParcel(trackingId){
            const taskIndex = this.tasks.findIndex(task => task.trackingId === trackingId);
            this.tasks[taskIndex].checked = !this.tasks[taskIndex].checked;
        },
        selectAllTasks(event) {
            this.selectAll = !this.selectAll;
            if (event.target.checked) {
                this.tasks = this.tasks.map(task => {
                    task.checked = true;
                    return task;
                });
            } else {
                this.tasks = this.tasks.map(task => {
                    task.checked = false;
                    return task;
                });
            }
        },
        clearFilters() {
            this.searchFilter = '';
            this.searchText = '';
        }
    },
    mounted() {
        // setTimeout(() => {
            this.headers = headers;
            this.drivers = [
                {
                    id: 'driver_1',
                    name: 'Charlie',
                    hub: 'dmk',
                    tasks: [],
                },
                {
                    id: 'driver_2',
                    name: 'Aof',
                    hub: 'dmk',
                    tasks: [],
                },
                {
                    id: 'driver_3',
                    name: 'Den',
                    hub: 'dmk',
                    tasks: [],
                },
            ];
            
            this.tasks = tasks.map(task => {
                task.checked = false;
                return task;
            });
        // }, 2000);
    }
}
</script>

<style scoped lang="scss">
.text_white {
    color: #fff
}
</style>