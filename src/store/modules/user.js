import { login, getInfo, userList, roleList, modify, password, status, add, remove, removeUsers, getOrgTree } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import qs from 'qs'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USER: (state, userInfo) => {
    state.userInfo = userInfo
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(qs.stringify({
        username: username,
        password: password
      })).then(result => {
        commit('SET_TOKEN', result.token)
        setToken(result.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(result => {
        const res = []
        result.menus.forEach(route => {
          res.push(route.permissionId + '')
        })
        if (!result) {
          reject('Verification failed, please Login again.')
        }
        // roles must be a non-empty array
        if (!res || res.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', res)
        commit('SET_NAME', result.name)
        result.userInfo.todoNum = result.todoNum
        result.userInfo.noticeNum = result.noticeNum
        console.info('=============')
        console.info(result.userInfo)
        commit('SET_USER', result.userInfo)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userList({ commit }, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      userList(JSON.parse(JSON.stringify(params))).then(result => {
        result.rows.forEach(row => {
          if (row.isActive === 'Y') {
            row.isActive = true
          } else if (row.isActive === 'N') {
            row.isActive = false
          }
        })
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  role({ commit }) {
    return new Promise((resolve, reject) => {
      roleList().then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  modify({ commit }, userInfo) {
    const { userId, loginNo, userName, phone, orgId, eMail, roles } = userInfo
    return new Promise((resolve, reject) => {
      modify(qs.stringify({
        userId: userId,
        loginNo: loginNo,
        userName: userName,
        phone: phone,
        orgId: orgId,
        eMail: eMail,
        roles: JSON.stringify(roles)
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  password({ commit }, userInfo) {
    const { userId } = userInfo
    return new Promise((resolve, reject) => {
      password(qs.stringify({
        userId: userId
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  status({ commit }, userInfo) {
    const { userId, enabled } = userInfo
    return new Promise((resolve, reject) => {
      status(qs.stringify({
        enabled: enabled,
        userId: userId
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  add({ commit }, userInfo) {
    const { loginNo, password, userName, phone, eMail, roles, orgId } = userInfo
    return new Promise((resolve, reject) => {
      add(qs.stringify({
        loginNo: loginNo,
        password: password,
        userName: userName,
        phone: phone,
        eMail: eMail,
        orgId: orgId,
        roles: JSON.stringify(roles)
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  remove({ commit }, userInfo) {
    const { userId } = userInfo
    return new Promise((resolve, reject) => {
      remove(qs.stringify({
        userId: userId
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeUsers({ commit }, userInfo) {
    const { users } = userInfo
    return new Promise((resolve, reject) => {
      removeUsers(qs.stringify({
        users: JSON.stringify(users)
      })).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },
  getOrgTree({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getOrgTree(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// dispatch：异步操作，写法： this.$store.dispatch('actions方法名',值)
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)
