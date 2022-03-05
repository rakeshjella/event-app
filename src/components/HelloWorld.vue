<template>
  <v-container>
    <v-row class="text-center">
      <v-main>
        <v-container>
          <v-row>
            <v-col
              v-for="eventCategory in events"
              :key="eventCategory.id"
              sm-6
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

                    <div>Tickets Available: {{ eventCategory.tickets }}</div>
                  </div>
                </v-card-text>

                <v-card-actions class="ma-2">
                 
                  <v-btn  block
                    outlined color="success"  v-if="eventCategory.tickets">
                    <v-icon color="green darken-2" left> mdi-calendar </v-icon>
                    Book Tickets
                  </v-btn>
                   <v-btn block outlined v-else> Tickes Closed </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EventsList",

  data: () => ({
    events: [
      {
        id: 1,
        src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        name: "IPL",
        date: "03 Oct,2021",
        tickets: 0,
      },
      {
        id: 2,
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        name: "India Vs Australia",
        date: "02 Mar,2022",
        tickets: 20,
      },
      {
        id: 3,
        src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        name: "Ranji",
        date: "02 Mar,2022",
        tickets: 50,
      },
      {
        id: 4,
        src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        name: "India A vs India B",
        date: "02 May,2022",
        tickets: 100,
      },
    ],
  }),
});
</script>
