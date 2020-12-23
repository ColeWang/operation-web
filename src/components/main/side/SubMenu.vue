<template>
  <a-sub-menu :key="parentItem.name" v-bind="$props">
    <template v-slot:title>
      <o-icon :type="parentItem.icon"></o-icon>
      <span>{{ parentItem.meta.title }}</span>
    </template>
    <template v-for="item in parentItem.children">
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
  </a-sub-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu } from 'ant-design-vue'
  import { showChildren } from '../util'

  export default defineComponent({
    name: 'SubMenu',
    isSubMenu: true,
    components: {
      [Menu.SubMenu.name]: Menu.SubMenu,
      [Menu.Item.name]: Menu.Item
    },
    props: {
      ...(Menu.SubMenu as any).props,
      parentItem: {
        type: Object,
        default: () => ({})
      }
    },
    setup () {
      return {
        showChildren
      }
    }
  })
</script>
