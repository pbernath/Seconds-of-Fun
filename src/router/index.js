import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JokesPagePresenter from "../presenter/JokesPagePresenter.vue";
import LoginPresenter from "../presenter/LoginPresenter.vue";
import ComicPresenter from "../presenter/ComicPresenter.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jokes_page/",
      name: "jokes",
      component: JokesPagePresenter,
    },
    {
      path: "/login_page/",
      name: "login",
      component: LoginPresenter,
    },
    {
      path: "/comic_page/",
      name: "comic",
      component: ComicPresenter,
    },
  ],
});

export default router;
