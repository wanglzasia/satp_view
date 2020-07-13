import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
const _import = require('./router/_import_' + process.env.NODE_ENV)// 获取组件的方法
import Layout from '@/layout' // Layout 是架构组件，不在后台返回，在文件里单独引入

var getRouter // 用来获取后台拿到的路由

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        try {
          route.component = _import(route.component)
        } catch (err) {
          route.component = () => import('@/views/404')
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) // 过滤路由
  router.addRoutes(getRouter) // 动态添加路由
  global.antRouter = getRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoutes = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (hasRoutes) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          getRouter = await store.dispatch('permission/generateRoutes')
          // dynamically add accessible routes
          saveObjArr('router', getRouter) // 存储路由到localStorage

          routerGo(to, next)// 执行路由跳转方法
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
