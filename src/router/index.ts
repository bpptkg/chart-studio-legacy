import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('../views/files/FileManager.vue'),
  },
  {
    path: '/file',
    component: () => import('../views/editor/ChartEditor.vue'),
    redirect: '/file/build',
    children: [
      {
        path: 'build',
        component: () => import('../views/editor/build/BuildView.vue'),
      },
      {
        path: 'compare',
        component: () => import('../views/editor/compare/CompareView.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
