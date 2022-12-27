import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";
import BoardListView from "@/views/board/BoardListView.vue";
import BoardAddView from "@/views/board/BoardAddView.vue";
import BoardDetailView from "@/views/board/BoardDetailView.vue";
import BoardModifyView from "@/views/board/BoardModifyView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/detail",
    component: DetailView,
  },
  {
    path: "/board",
    name: "boardList",
    component: BoardListView,
  },
  {
    path: "/board/add",
    name: "boardAdd",
    component: BoardAddView,
  },
  {
    path: "/board/detail/:id",
    name: "boardDetail",
    component: BoardDetailView,
    props: true,
  },
  {
    path: "/board/modify/:id",
    name: "boardModify",
    component: BoardModifyView,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
