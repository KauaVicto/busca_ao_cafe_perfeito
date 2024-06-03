import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CafeView from '@/views/CafeView.vue'
import CadUsuarioView from '@/views/CadUsuarioView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'cafe',
    component: CafeView
  },
  {
    path: '/cadastrar',
    name: 'cadastrar_usuario',
    component: CadUsuarioView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
