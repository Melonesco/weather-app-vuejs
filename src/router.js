import { createRouter, createWebHistory } from 'vue-router/dist/vue-router'
import Home from './components/Home.vue'
import Favorites from './components/Favorites.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: Home, alias: '/' },
    { path: '/favorites', component: Favorites }
  ]
})
