<template>
  <transition name="x-mask">
    <div class="x-shade" v-show="visible">
      <div class="x-loading-wrapper">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'BaseLoading',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style scoped lang="scss">
  @import "~@/assets/css/transition.scss";

  .x-shade {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);

    .x-loading-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 60px;
      height: 60px;

      .circular {
        height: 60px;
        width: 60px;
        animation: loading-rotate 2s linear infinite;
      }

      .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: $primary;
        stroke-linecap: round;
      }

      @keyframes loading-rotate {
        100% {
          transform: rotate(1turn);
        }
      }

      @keyframes loading-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -40px;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -120px;
        }
      }
    }
  }
</style>
