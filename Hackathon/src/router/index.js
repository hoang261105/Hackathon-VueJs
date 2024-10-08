import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "@/views/Dashboard.vue";
import ManagerProduct from "@/views/ManagerProduct.vue";
import ManagerCategory from "@/views/ManagerCategory.vue";

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/*webpackChunkName: "admin"*/ "@/views/Dashboard.vue"),
  },
  {
    path: "/admin/manager-product",
    name: "manager-product",
    component: () =>
      import(
        /*webpackChunkName: "manager-product"*/ "@/views/ManagerProduct.vue"
      ),
  },
  {
    path: "/admin/manager-category",
    name: "manager-category",
    component: () =>
      import(
        /*webpackChunkName: "manager-category"*/ "@/views/ManagerCategory.vue"
      ),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
