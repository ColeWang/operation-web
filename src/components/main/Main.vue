<template>
  <div class="main">
    <main-side :menu-list="menuList"></main-side>
    <div class="prime">
      <main-header></main-header>
      <div class="content">
        <main-content></main-content>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, provide, InjectionKey, onUnmounted } from 'vue'
  import MainHeader from './header'
  import MainSide from './side'
  import MainContent from './content'
  import { getMenuList, MenuItem } from './util'
  import { ObserverKey, subscribe, unsubscribe } from '@/common/observer'
  import { useStore, Store } from 'vuex'
  import { RootState } from '@/store'
  import routes from '@/routes'

  export const INLINE_STATUS: InjectionKey<Ref<boolean>> = Symbol()
  export const ALTER_INLINE_STATUS: ObserverKey<boolean> = Symbol()

  export default defineComponent({
    name: 'Main',
    components: {
      MainHeader,
      MainSide,
      MainContent
    },
    setup () {
      const store: Store<RootState> = useStore()
      const menuList: MenuItem[] = getMenuList(routes, store.state.user.userInfo.access)
      const inlineStatus: Ref<boolean> = ref(false)

      provide(INLINE_STATUS, inlineStatus)

      subscribe(ALTER_INLINE_STATUS, (value) => {
        inlineStatus.value = value
      })

      onUnmounted(() => {
        unsubscribe(ALTER_INLINE_STATUS)
      })

      return {
        menuList
      }
    }
  })
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .prime {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .content {
        flex: 1;
        overflow: hidden;
      }
    }
  }
</style>
