import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/index.vue'),
    props: true,
  },
  {
    name: 'trello',
    path: '/trello',
    component: () => import('@/pages/trello.vue'),
    props: true,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default router
