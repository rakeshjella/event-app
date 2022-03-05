<template>
  <v-container>
    <v-row class="text-center">
      <v-main>
        <v-container name="event-list-con">
          <v-row my-2>
            <v-col md="3" offset-md="9">
               <v-text-field
              class="searchEventList"
              v-model="searchEventVM"
              hidedetails
              placeholder="Search Event"
              @input="searchAdvSpecs($event)"
              outlined
            >
            </v-text-field>
            </v-col>
           
          </v-row>
          <v-row v-if="!isAdvDetailsEmpty">
            <v-col
              v-for="eventCategory in events"
              :key="eventCategory.id"
              xs-6
              sm-3
              md-3
            >
              <v-card class="mx-auto" max-width="344">
                <v-img :src="eventCategory.src" height="200px"></v-img>

                <v-card-title> {{ eventCategory.name }} </v-card-title>

                <v-card-text>
                  <div class="d-flex justify-space-between mb-2">
                    <div>
                      {{ eventCategory.date }}
                    </div>

                    <div>Tickets Available: <span :class="eventCategory.tickets?'green--text':'red--text'">{{ eventCategory.tickets }}</span></div>
                  </div>
                </v-card-text>

                <v-card-actions class="ma-2 action-btn-con">
                  <router-link
                    :to="{ path: 'eventbook', query: { id: eventCategory.id } }"
                    v-if="eventCategory.tickets"
                    class="tickets-btn"
                  >
                    <v-btn block outlined color="green">
                      <v-icon color="green darken-2" left>
                        mdi-calendar
                      </v-icon>
                      Book Tickets
                    </v-btn>
                  </router-link>
                  <v-btn block outlined v-else>
                    <v-icon color="red darken-2" left>
                      mdi-calendar-remove-outline
                    </v-icon>
                    Sold Out
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col>
              <h1 class="red--text">No Events Found</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import Vue from "vue";
// import axios from 'axios';
import store from '../store/index';
export default Vue.extend({
  name: "EventsList",

  data: () => ({
    searchEventVM: "",
    events: [
      {
        id: 0,
        src: "",
        name: "",
        date: "",
        tickets: 0,
      },
    ],
    eventsFilter: [{ id: 0, src: "", name: "", date: "", tickets: 0 }],
    eventsDupObj:[{ id: 0, src: "", name: "", date: "", tickets: 0 }],
    isAdvDetailsEmpty: false,
  }),
  computed:{
    geteventsList(){
      return this.$store.state.eventsData
    }
  },
  methods: {
    filterEventsList(txt: string) {
      let filterObj = JSON.parse(JSON.stringify(this.events));
      this.eventsFilter = filterObj.filter((item: any) => {
        var mainCatExists =
          item.name.toLowerCase().indexOf(txt.toLowerCase()) >= 0;
        if (mainCatExists) {
          return mainCatExists;
        }
      });
      if (this.eventsFilter.length > 0) {
        this.isAdvDetailsEmpty = false;
        this.events = this.eventsFilter;
      } else {
        this.isAdvDetailsEmpty = true;
      }
    },
    searchAdvSpecs(e: any) {
      this.searchEventVM = e;
      if (this.searchEventVM.length) {
        this.filterEventsList(this.searchEventVM);
      } else {
        this.filterEventsList(this.searchEventVM);
        this.events = this.eventsDupObj;
      }
    },
  },
  mounted() {
    this.events = this.geteventsList;
    let a = this.events;
    this.eventsFilter = a;
    this.eventsDupObj = JSON.parse(JSON.stringify(this.events));
  },
});
</script>
<style scoped>
.tickets-btn {
  width: 100%;
}
.action-btn-con a {
  text-decoration: none;
}
</style>
