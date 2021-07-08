<template>
  <v-row justify="center" align="center" class="pt-5">
    <v-col cols="12" sm="12" md="12" class="mt-4 box pa-0">
      <v-row class="pa-3 header">
        <v-col class="bb">
          Shipment ID
        </v-col>
        <v-col class="bb">
          Receiver
        </v-col>
        <v-col class="bb">
          Contact No.
        </v-col>
        <v-col class="bb">
          Address
        </v-col>
        <v-col class="bb">
          Hub
        </v-col>
        <v-col class="bb">
          Status
        </v-col>
        <v-col class="bb">
          Parcel Type
        </v-col>
      </v-row>
      <Container @drop="onDrop" lock-axis="y">
        <Draggable v-for="(data,index) in desserts" :key="index">
          <v-row class="pa-3 mt-0 pt-0" >
            <v-col class="box-col">
              <v-icon
                dense
                color="#666"
              >
                mdi-menu
              </v-icon>
              {{data.shipment_id}}
            </v-col>
            <v-col class="box-col">
              {{data.receiver}}
            </v-col>
            <v-col class="box-col">
              {{data.contact_no}}
            </v-col>
            <v-col class="box-col">
              {{data.address}}
            </v-col>
            <v-col class="box-col">
              {{data.hub}}
            </v-col>
            <v-col class="box-col">
              {{data.status}}
            </v-col>
            <v-col class="box-col">
              {{data.type}}
            </v-col>
          </v-row>
        </Draggable>
      </Container>
    </v-col>
  </v-row>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd"
export default {
  data() {
    return {
      desserts: [
          {
            shipment_id: 1,
            receiver: 'Entry',
            contact_no:123456,
            address:'123 m1',
            hub:'dmk',
            status:'progress',
            type:'Pending'
          },
          {
            shipment_id: 2,
            receiver: 'Entry',
            contact_no:123456,
            address:'321 m2',
            hub:'rsm',
            status:'progress',
            type:'Entry'
          },
        ],
    }
  },
  methods: {
    onDrop(dropResult) {
      console.log(dropResult)
      this.move(this.desserts,dropResult.removedIndex,dropResult.addedIndex)
    },
    move(arr,from,to){

      let numberOfDeletedElm = 1;

      const elm = arr.splice(from, numberOfDeletedElm)[0];

      numberOfDeletedElm = 0;

      arr.splice(to, numberOfDeletedElm, elm);

    }
  },
  components:{
    Container,
    Draggable
  }
}
</script>

<style lang="scss" scoped>
.header{
    font-size: 0.75rem;
    font-weight: 600;
    color: #666;
}
.box{
  border: 1px #CCC solid;

  .bb{
    border-bottom: 1px #CCC solid;
  }

  .box-col{
    font-size: 0.8rem;
  }
}
</style>
