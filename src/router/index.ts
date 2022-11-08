import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import FileManager from '@/views/files/FileManager.vue'
import ChartEditor from '@/views/editor/ChartEditor.vue'
import BuildView from '@/views/editor/build/BuildView.vue'
import CompareView from '@/views/editor/compare/CompareView.vue'
import AboutView from '@/views/AboutView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/file',
  },
  {
    path: '/files',
    component: FileManager,
  },
  {
    path: '/file',
    component: ChartEditor,
    redirect: '/file/build',
    children: [
      {
        path: 'build',
        component: BuildView,
      },
      {
        path: 'compare',
        component: CompareView,
      },
    ],
  },
  {
    path: '/about',
    component: AboutView,
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
