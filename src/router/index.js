/*
  * index.js creates the router and exports it. The router is used in main.js
  * to create the Vue instance.
  * 
  * The router is a Vue Router object. It is created using the createRouter
  * function. The createRouter function takes an object as a parameter.
  * 
  * The object has two properties: history and routes.
  * 
  * The history property is created using the createWebHistory function.
  * The routes property is an array of objects. Each object represents a route.
  * 
  * The object has two properties: path and component.
  * 
  * The path property is a string that represents the URL path.
  * The component property is the component that should be displayed when the path is visited.
*/

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JokesPagePresenter from "../presenter/JokesPagePresenter.vue";
import LoginPresenter from "../presenter/LoginPresenter.vue";
import ComicPresenter from "../presenter/ComicPresenter.vue";
import FavoriteJokesPresenter from "../presenter/FavoriteJokesPresenter.vue"; 
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
    {
      path: "/favorite_jokes_page/",
      name: "favorite_jokes",
      component: FavoriteJokesPresenter,
    },
  ],
});

export default router;
