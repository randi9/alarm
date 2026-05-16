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
    },
    {
      path: '/admin',
      component: () => import('../pages/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../pages/admin/DashboardPage.vue'),
          meta: { title: 'Admin Dashboard — BunYing' }
        },
        {
          path: 'categories',
          name: 'admin-categories',
          component: () => import('../pages/admin/CategoriesPage.vue'),
          meta: { title: 'Manage Categories — BunYing' }
        },
        {
          path: 'ringtones',
          name: 'admin-ringtones',
          component: () => import('../pages/admin/RingtonesPage.vue'),
          meta: { title: 'Manage Ringtones — BunYing' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/admin/LoginPage.vue'),
      meta: { title: 'Login Admin — BunYing' }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'BunYing — Alarm & Ringtone Unik'

  const isAuthenticated = !!localStorage.getItem('admin_token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
