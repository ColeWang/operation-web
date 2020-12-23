import { createStore, Store } from 'vuex'
import user, { State as UserState } from './modules/user'

export interface RootState {
  user: UserState;
}

const store: Store<RootState> = createStore({
  modules: {
    user
  }
})

export default store
