<template>
  <div class="main-side" :style="setStyle">
    <div class="side">
      <div class="logo"></div>
      <a-menu v-model:selected-keys="selectedKeys"
              :inline-collapsed="inlineStatus"
              @click="onSelect"
              :style="setStyle"
              theme="dark"
              mode="inline">
        <template v-for="(item, index) in menuList" :key="index">
          <template v-if="item.children && item.children.length === 1">
            <a-menu-item :key="item.children[0].name">
              <o-icon :type="item.children[0].icon"></o-icon>
              <span>{{ item.children[0].meta.title }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu v-if="showChildren(item)" :parentItem="item" :key="item.name"></sub-menu>
            <a-menu-item v-else :key="item.name">
              <o-icon :type="item.icon"></o-icon>
              <span>{{ item.meta.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref, watchEffect, computed, ComputedRef, CSSProperties } from 'vue'
  import { Menu } from 'ant-design-vue'
  import SubMenu from './SubMenu.vue'
  import { INLINE_STATUS } from '../Main.vue'
  import { showChildren } from '../util'
  import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router'

  interface OnSelectParams {
    key: string;
    keyPath: string[];
    item: any;
    domEvent: MouseEvent;
  }

  export default defineComponent({
    name: 'MainSide',
    components: {
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      [SubMenu.name]: SubMenu
    },
    props: {
      menuList: {
        type: Array,
        default: () => ([])
      }
    },
    setup () {
      const router: Router = useRouter()
      const route: RouteLocationNormalizedLoaded = useRoute()
      const inlineStatus: Ref<boolean> | undefined = inject(INLINE_STATUS)
      const selectedKeys: Ref<string[]> = ref([])

      function onSelect (params: OnSelectParams): void {
        if (route.matched[1].name !== params.key) {
          router.push({ name: params.key })
        }
      }

      watchEffect(() => {
        selectedKeys.value = [(route.name as string)]
      })

      const setStyle: ComputedRef<CSSProperties> = computed(() => {
        if (inlineStatus && inlineStatus.value) {
          return { width: '77px' }
        }
        return { width: '238px' }
      })

      return {
        inlineStatus,
        selectedKeys,
        showChildren,
        onSelect,
        setStyle
      }
    }
  })
</script>

<style scoped lang="scss">
  .main-side {
    background: #001529;
    user-select: none;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    overflow: hidden;

    .logo {
      height: 60px;
    }

    .side {
      position: relative;
      height: 100%;
      padding-top: 0.1px;
      margin-top: -0.1px;
      overflow-y: scroll;
      margin-right: -18px;

      &::-webkit-scrollbar {
        width: 17px;
      }
    }
  }
</style>
