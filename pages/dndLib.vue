<template>
    <section>
        <v-data-table
            :headers="headers"
            :items="tasks"
            item-key="id"
            :show-select="false"
            :single-select="false"
            :disable-pagination="true"
            :hide-default-footer="true"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>Unassigned Tasks</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <label for="select_driver" style="display: block; margin-right: 1rem;">Select a Driver</label>
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
                    <v-btn
                        class="ma-2"
                        :loading="loading"
                        :disabled="loading"
                        color="primary"
                        @click="assignToDriver"
                        >
                        Assign
                    </v-btn>
                    <v-spacer></v-spacer>
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
        <!-- all drivers of the hub -->
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
                    <v-toolbar-title>{{driver.name}}</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
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
        </v-data-table>
    </section>
</template>

<script>
import draggable from 'vuedraggable';
import tasks from '../utils/parcelTasks.js';
import headers from '../utils/headers.js';

export default {
    components: {draggable},
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
            selectedDriver: '',
            selectAll: false,
            loading: false,
        }
    },
    computed: {
        driverList() {
            return this.drivers.map(driver => driver.name);
        }
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
    },
    mounted() {
        this.drivers = [
            {
                id: 'driver_1',
                name: 'Charlie',
                tasks: []
            },
            {
                id: 'driver_2',
                name: 'Aof',
                tasks: []
            },
            {
                id: 'driver_3',
                name: 'Den',
                tasks: []
            },
        ];
        this.headers = headers;
        this.tasks = tasks.map(task => {
            task.checked = false;
            return task;
        });
    }
}
</script>

<style scoped lang="scss">
</style>