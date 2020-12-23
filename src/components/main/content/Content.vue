<template>
  <div class="main-content">
    <div :ref="refNode" class="main-content-space">
      <div>
        <router-view></router-view>
      </div>
    </div>
    <a-back-top :target="() => space"></a-back-top>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue'
  import { BackTop } from 'ant-design-vue'

  export default defineComponent({
    name: 'MainContent',
    components: {
      [BackTop.name]: BackTop
    },
    setup () {
      const space: Ref<Element | null> = ref(null)

      function refNode (el: Element | null) {
        space.value = el
      }

      return {
        space,
        refNode
      }
    }
  })
</script>

<style scoped lang="scss">
  .main-content {
    @include size(100%, 100%);
    background: $background;
    position: relative;
    overflow: hidden;

    .main-content-space {
      @include size(100%, 100%);
      padding: 18px;
      overflow-y: auto;
    }
  }
</style>
