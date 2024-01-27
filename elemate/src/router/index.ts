import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/HomeView.vue'
import ElemateAnimals from '../pages/Animals.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/animals',
    name: 'ElemateAnimals',
    component: ElemateAnimals
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
