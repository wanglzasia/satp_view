import { constantRoutes } from '@/router'
import { getMenuInfo } from '@/api/user'
// import Layout from '@/layout'
// import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
//   // const accessedRouters = asyncRouterMap.filter(route => {
//   //   if (route.component) {
//   //     if (route.component === 'Layout') { // Layout组件特殊处理
//   //       console.log(11111)
//   //       route.component = Layout
//   //     } else {
//   //       console.log(22222)
//   //       route.component = _import(route.component)
//   //     }
//   //   }
//   //   if (route.children && route.children.length) {
//   //     route.children = filterAsyncRouter(route.children)
//   //   }
//   //   return true
//   // })
//   const res = []
//   asyncRouterMap.forEach(menu => {
//     if (menu.component) {
//       if (menu.component === 'Layout') { // Layout组件特殊处理
//         menu.component = Layout
//       } else {
//         menu.component = () => import('@/views/' + menu.component + '.vue')
//       }
//     }
//     if (menu.children && menu.children.length) {
//       menu.children = filterAsyncRouter(menu.children)
//     }
//     res.push(menu)
//   })
//   return res
// }
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getMenuInfo().then(result => {
        commit('SET_ROUTES', result.menus)
        resolve(result.menus)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
