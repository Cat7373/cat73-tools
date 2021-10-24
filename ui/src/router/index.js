import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import("@/views/home/home.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 404 page
router.beforeEach((guard) => {
  if (!router.hasRoute(guard.name)) {
    router.push({ name: '404' })
  }
})

router.onError((callback) => {
  console.log("error", callback)
})

export default router
