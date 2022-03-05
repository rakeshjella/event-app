<template>
  <events-list />
</template>

<script lang="ts">
  import Vue from 'vue'
  import EventsList from '../components/EventsList.vue'

  export default Vue.extend({
    name: 'eventslist',

    components: {
      EventsList,
    },
  })
</script>
