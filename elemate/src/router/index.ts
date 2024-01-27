import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/HomeView.vue'
import About from '../pages/AboutView.vue'
import ElemateAnimals from '../pages/Animals.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
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
