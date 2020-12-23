<template>
  <div class="main-header">
    <div class="header-left">
      <div class="setting-down" @click="handleInline(!inlineStatus)">
        <o-icon class="icon" :class="{'down': inlineStatus}" type="iconcaidan"></o-icon>
      </div>
    </div>
    <div class="header-right">
      <fullscreen></fullscreen>
      <avatar></avatar>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, inject } from 'vue'
  import Fullscreen from './Fullscreen.vue'
  import { INLINE_STATUS, ALTER_INLINE_STATUS } from '../Main.vue'
  import { publish } from '@/common/observer'
  import Avatar from './Avatar.vue'

  export default defineComponent({
    name: 'MainHeader',
    components: {
      Avatar,
      Fullscreen
    },
    setup () {
      const inlineStatus: Ref<boolean> | undefined = inject(INLINE_STATUS)

      function handleInline (val: boolean): void {
        publish(ALTER_INLINE_STATUS, val)
      }

      return {
        handleInline,
        inlineStatus
      }
    }
  })
</script>

<style scoped lang="scss">
  .main-header {
    @include size(100%, 60px);
    user-select: none;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $border;
    background: $white;

    .header-left, .header-right {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .header-left {
      .setting-down {
        width: 40px;
        height: 40px;
        display: flex;

        .icon {
          font-size: 24px;
          text-align: center;
          color: $icon;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
          margin: auto;
        }

        &:hover {
          .icon {
            color: $primary;
          }
        }

        .down {
          transform: rotate(90deg);
        }
      }
    }

    .header-right {
      padding-right: 20px;
    }
  }
</style>
