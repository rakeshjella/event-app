import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "eventslist" */ '../views/EventsListView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/eventslist',
    name: 'eventslist',    
    component: () => import(/* webpackChunkName: "eventslist" */ '../views/EventsListView.vue')
  },
  {
    path: '/eventbook',
    name: 'eventbook',    
    component: () => import(/* webpackChunkName: "eventsbook" */ '../views/EventsBookView.vue')
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
