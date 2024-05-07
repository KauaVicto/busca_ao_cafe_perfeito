import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CafeView from '../views/CafeView.vue'
import AvaliarView from '@/views/AvaliarView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'cafe',
    component: CafeView
  },
  {
    path: '/avaliar/:id',
    name: 'avaliar',
    component: AvaliarView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
