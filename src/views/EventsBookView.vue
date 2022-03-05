<template>
  <event-book />
</template>

<script lang="ts">
  import Vue from 'vue'
  import EventBook from '../components/EventBook.vue'

  export default Vue.extend({
    name: 'eventbook',

    components: {
      EventBook,
    },
  })
</script>
