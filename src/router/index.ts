import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition !== null) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired) {
    const token = localStorage.getItem('token')

    if (
      token === undefined ||
      token === null ||
      token === '' ||
      token === 'undefined'
    ) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
