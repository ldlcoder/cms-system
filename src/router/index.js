import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts/Layout'
import AdminIndex from '@/views/AdminIndex'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import store from '@/store'
export * from './routerHandler'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/Login')
        },
        {
          path: '404',
          name: 'Page404',
          component: () => import('@/views/errorPage/404')
        },
        {
          path: '503',
          name: 'Page503',
          component: () => import('@/views/errorPage/503')
        },
        {
          path: '',
          redirect: { name: 'AdminIndex' }
        }
      ]
    },
    {
      path: '/',
      name: 'Admin',
      component: () => import('@/layouts/AdminLayout'),
      children: [
        {
          path: 'index',
          name: 'AdminIndex',
          component: AdminIndex
        }
      ]
    }
  ]
})

const setRemember = (to, from, next) => {
  if (to.meta.remember) {
    store.commit('SET_REMEMBER_ROUTE', from.name)
  }
  const remember = (from.meta.remember || !from.name) && (!store.getters.rememberRoute || to.name === store.getters.rememberRoute)
  store.commit('SET_REMEMBER', remember)
  next()
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断权限路由部分是否添加

  if (!store.getters.isLogin) {
    to.name !== 'Login' ? next({ name: 'Login' }) : next()
    NProgress.done()
  } else {
    if (to.name === 'Login') {
      next({ name: 'AdminIndex' })
    } else {
      setRemember(to, from, next)
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
