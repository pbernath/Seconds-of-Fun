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
      path: '/another_page',
      name: 'another_page',
      component: () => import('../views/AnotherPage.vue')
    },
    {
      path: '/xkcd',
      name: 'xkcd',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/xkcd.vue')
    }
  ]
})

export default router
