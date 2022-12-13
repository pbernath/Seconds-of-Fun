import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnotherPagePresenter from '../presenter/AnotherPagePresenter.vue'
import secondsModel from '../model/secondsModel'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/another_page/',
      name: 'another_page',
      component: AnotherPagePresenter,
    },

  ]
})

export default router
