import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/compare-countries',
      name: 'compare',
      component: () => import('../views/CompareView.vue')
    },
    {
      path: '/country-details',
      name: 'country-details',
      component: () => import('../views/CountryView.vue')
    }
  ]
})

export default router
