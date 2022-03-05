import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventsData: [
      {
        "id": 1,
        "src": "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        "name": "IPL",
        "date": "03 Oct,2021",
        "tickets": 0
      },
      {
        "id": 2,
        "src": "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        "name": "India Vs Australia",
        "date": "02 Mar,2022",
        "tickets": 20
      },
      {
        "id": 3,
        "src": "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        "name": "Ranji",
        "date": "02 Mar,2022",
        "tickets": 50
      },
      {
        "id": 4,
        "src": "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        "name": "India A vs India B",
        "date": "02 May,2022",
        "tickets": 100
      },
      {
        "id": 5,
        "src": "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        "name": "India vs Sri Lanka ",
        "date": "02 May,2022",
        "tickets": 4
      }
    ]
  },
  getters: {
  },
  mutations: {
    updateTickeCount(state, payload) {
      let updateEvent = state.eventsData.filter(update => update.id == payload.currentEventId)[0];
      updateEvent.tickets = payload.updateTicket;
    }
  },
  actions: {
  },
  modules: {
  }
})
