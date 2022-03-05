<template>
  <div class="about">
    <div class="ticket-info mt-3 mb-5 text-center">
      <h2>{{currentData.name}}</h2>
      <h4 my-4>{{currentData.date}}</h4>
      <h4 my-2>Tickets Available: <span class="green--text text--darken-1">{{currentData.tickets}}</span></h4>
    </div>
    <v-row my-5>
      <v-col md="10" offset-md="1">
        <v-cotainer name="event-book-con">
          <v-card class="px-5 py-10">
            <v-row>
              <v-col class="col-md-6">
                <v-img
                  :src="currentData.src"
                  height="200px"
                ></v-img>

                <router-link to="/eventslist" class="remove-underline">
                  <v-btn class="ma-2" outlined color="grey">
                    Go Back To Events List
                  </v-btn>
                </router-link>
              </v-col>

              <v-col class="col-md-6">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-alert dense text type="success" v-if="showMessage">
                    You have booked <strong> {{ seats }} </strong>
                     <span> {{seats>2?'tickets':'ticket'}} </span>
                  </v-alert>

                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name*"
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail*"
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="phonenumber"
                    :rules="phonerules"
                    label="Phone No*"
                    outlined
                    required
                  ></v-text-field>

                  <v-select
                    v-model="seats"
                    :items="seatList"
                    label="Number Of Seats"
                    outlined
                    dense
                    required
                    :rules="seatRules"
                    @change="ChangeSeats"
                  ></v-select>

                  <v-text-field
                    v-model="item.value"
                    :rules="attendeeRules"
                    label="Name of Attendee *"
                    outlined
                    required
                    item-text="item.name"
          item-value="item.value"
                    v-for="item in attendeeObj"
                    :key="item.id"
                  ></v-text-field>

                  <v-btn
                    color="primary"
                    class="mr-4"
                    @click="bookTicket"
                    :disabled="disableBtn"
                  >
                    Submit
                  </v-btn>

                  <v-btn
                    outlined
                    class="mr-4"
                    @click="reset"
                    :disabled="disableBtn"
                  >
                    Cancel
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-cotainer>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from '../store/index';
export default Vue.extend({
  name: "EventsBook",

  data: () => ({
    currentData:{
       "id": 0,
        "src": "",
        "name": "",
        "date": "",
        "tickets": 0
    },
    showMessage: false,
    valid: true,
    name: "",
    phonenumber: "",
    email: "",
    seats: "1",
    attendee: "",
    nameRules: [
      (v: any) => !!v || "Name is required",
      (v: string | any[]) =>
        (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    emailRules: [
      (v: any) => !!v || "E-mail is required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    phonerules: [
      (v: any) => !!v || "Phone Number is required",
      (v: string) => /^[0-9]{10}$/.test(v) || "Phone Number must be valid",
    ],
    seatRules: [(v: any) => !!v || "Number of seats is required"],
    attendeeRules: [(v: any) => !!v || "Name of Attendee is required"],

    seatList: ["1"],
    attendeeCount: 1,
    ticketCount: 1,
    disableBtn: false,
    ticketobj: {},
    attendeeObj: [
      {
       
        id:0,
        name:'',
         value: "",
      },
    ],
  }),
  computed: {
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean };
    },
    getCurrentEventData(){
       return this.$store.state.eventsData.filter((d: { id: string|(string|null)[]; })=>d.id== this.$route.query.id)[0]
    }
  },

  methods: {
    bookTicket() {
      this.form.validate();
      if (!this.form.validate()) {
        return;
      } else {
        let currentBookedTickets = parseInt(this.seats);
        let updateTicketVal =  this.ticketCount - currentBookedTickets;
        this.$store.commit('updateTickeCount',{
          currentEventId:this.currentData.id,
          updateTicket:updateTicketVal
        })
        let finalObj = {
          name: this.name,
          phonenumber: this.phonenumber,
          email: this.email,
          seats: this.seats,
          attendees: [...this.attendeeObj],
        };
        console.log('Data to save is:'+ JSON.stringify(finalObj));
        this.disableBtn = true;
        this.showMessage = true;
        setTimeout(() => {
          this.$router.push("/eventslist");
        }, 2000);
      }
    },
    reset() {
      this.name = "";
      this.phonenumber = "";
      this.email = "";
      this.seats = "1";
      this.attendeeCount = 1;
    },

    ChangeSeats() {
      this.attendeeCount = parseInt(this.seats);
      this.addAttende(this.attendeeCount);
    },
    addAttende(count: number) {
      this.attendeeObj =[];
      for (var i = 0; i < count; i++) {
        this.attendeeObj.push({ id:i , name:'',value: "",});
      }
    },
  },
  mounted() {
    debugger;
    this.currentData = this.getCurrentEventData;
    this.ticketCount = this.currentData.tickets;
    // this.seatList = ["1"];
    if (this.ticketCount >= 6) {
      for (let i = 1; i <= 6; i++) {
        if (i > 1) {
          let a = i.toString();
          this.seatList.push(a);
        }
      }
    } else {
      for (let i = 1; i <= this.ticketCount; i++) {
        if (i > 1) {
          let a = i.toString();
          this.seatList.push(a);
        }
      }
    }
  },
});
</script>
<style scoped>
.remove-underline {
  text-decoration: none;
}
</style>
