import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AssignmentView from "../views/AssignmentView.vue";
import Error404View from "../views/Error404View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/assignment",
      name: "assignment",
      component: AssignmentView,
    },
    {
      path: "/:pathMatch(.*)",
      name: "Error404View",
      component: Error404View,
    },
  ],
});

export default router;
