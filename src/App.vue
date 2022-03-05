<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="menu-links">
        <router-link to="/eventslist">
          <v-btn class="ma-2" outlined color="grey"> Events List </v-btn>
        </router-link>

        <router-link to="/about">
          <v-btn class="ma-2" outlined color="grey"> About </v-btn>
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
<style scoped>
.menu-links .router-link-active .v-btn {
  color: green !important;
}
.menu-links a {
  text-decoration: none;
  color: #ccc;
}
</style>
