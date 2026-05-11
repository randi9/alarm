import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
      meta: { title: 'BunYing — Alarm & Ringtone Paling Ngeselin se-Indonesia' }
    },
    {
      path: '/kategori/:slug',
      name: 'category',
      component: () => import('../pages/CategoryPage.vue'),
      meta: { title: 'Kategori — BunYing' }
    },
    {
      path: '/ringtone/:id',
      name: 'ringtone-detail',
      component: () => import('../pages/RingtoneDetailPage.vue'),
      meta: { title: 'Ringtone — BunYing' }
    },
    {
      path: '/download/:id',
      name: 'download',
      component: () => import('../pages/DownloadPage.vue'),
      meta: { title: 'Download — BunYing' }
    },
    {
      path: '/premium',
      name: 'premium',
      component: () => import('../pages/PremiumPage.vue'),
      meta: { title: 'Paket Premium — BunYing' }
    },
    {
      path: '/tentang',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
      meta: { title: 'Tentang — BunYing' }
    },
    {
      path: '/privasi',
      name: 'privacy',
      component: () => import('../pages/PrivacyPage.vue'),
      meta: { title: 'Kebijakan Privasi — BunYing' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
      meta: { title: '404 — BunYing' }
    }
  ]
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'BunYing — Alarm & Ringtone Unik'
})

export default router
