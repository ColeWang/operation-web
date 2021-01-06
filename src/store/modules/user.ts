import { ActionContext, ActionTree, MutationTree, Module } from 'vuex'
import { RootState } from '@/store'
import Axios from 'axios'
import { queryUserInfo } from '@/api/user'

// 设置用户信息
export const SET_USER_INFO = 'setUserInfo'
// 获取用户信息
export const GET_USER_INFO = 'getUserInfo'
// 重置
export const REMOVE_USER_INFO = 'removeUserInfo'

export interface UserInfo {
  hasGetInfo: boolean;
  access: Array<string | number>;
}

export interface State {
  userInfo: UserInfo
}

const state: State = {
  userInfo: {
    // 有无用户数据
    hasGetInfo: false,
    // 用户权限信息
    access: []
  }
}

const mutations: MutationTree<State> = {
  [SET_USER_INFO] (state, data: UserInfo): void {
    state.userInfo.hasGetInfo = data.hasGetInfo
    state.userInfo.access = data.access
  },
  [REMOVE_USER_INFO] (state): void {
    state.userInfo.hasGetInfo = false
  }
}

const actions: ActionTree<State, RootState> = {
  [GET_USER_INFO] (context: ActionContext<State, RootState>): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      Axios.all([queryUserInfo()])
        .then(Axios.spread((info) => {
          if (info.actionResult === '1') {
            const data: UserInfo = {
              hasGetInfo: true,
              access: []
            }
            context.commit(SET_USER_INFO, data)
            resolve(data)
          } else {
            reject(new Error(info.message))
          }
        }))
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const user: Module<State, RootState> = {
  state,
  mutations,
  actions
}

export default user
