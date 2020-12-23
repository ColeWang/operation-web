<template>
  <div class="fullscreen">
    <o-icon :type="fullscreen ? 'iconfullscreen-shrink' : 'iconfullscreen-expand'"
            @click="handleFullscreen(fullscreen)"
            class="icon">
    </o-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, onBeforeUnmount } from 'vue'

  const dom: any = document

  export default defineComponent({
    name: 'Fullscreen',
    setup () {
      const fullscreen: Ref<boolean> = ref(false)

      function handleFullscreen (val: boolean): void {
        if (val) {
          if (dom.exitFullscreen) {
            dom.exitFullscreen()
          } else if (dom.mozCancelFullScreen) {
            dom.mozCancelFullScreen()
          } else if (dom.webkitCancelFullScreen) {
            dom.webkitCancelFullScreen()
          } else if (dom.msExitFullscreen) {
            dom.msExitFullscreen()
          }
        } else {
          if (dom.body.requestFullscreen) {
            dom.body.requestFullscreen()
          } else if (dom.body.mozRequestFullScreen) {
            dom.body.mozRequestFullScreen()
          } else if (dom.body.webkitRequestFullScreen) {
            dom.body.webkitRequestFullScreen()
          } else if (dom.body.msRequestFullscreen) {
            dom.body.msRequestFullscreen()
          }
        }
      }

      function fullscreenChange (): void {
        fullscreen.value = !fullscreen.value
      }

      function isVideoInFullscreen (): boolean {
        return !!(dom.fullscreenElement || dom.mozFullScreenElement || dom.webkitFullscreenElement || dom.fullScreen || dom.mozFullScreen || dom.webkitIsFullScreen)
      }

      onMounted(() => {
        dom.addEventListener('fullscreenchange', fullscreenChange, false)
        dom.addEventListener('mozfullscreenchange', fullscreenChange, false)
        dom.addEventListener('webkitfullscreenchange', fullscreenChange, false)
        dom.addEventListener('msfullscreenchange', fullscreenChange, false)
        fullscreen.value = isVideoInFullscreen()
      })

      onBeforeUnmount(() => {
        dom.removeEventListener('fullscreenchange', fullscreenChange, false)
        dom.removeEventListener('mozfullscreenchange', fullscreenChange, false)
        dom.removeEventListener('webkitfullscreenchange', fullscreenChange, false)
        dom.removeEventListener('msfullscreenchange', fullscreenChange, false)
      })

      return {
        fullscreen,
        handleFullscreen
      }
    }
  })
</script>

<style scoped lang="scss">
  .fullscreen {
    height: 100%;
    width: 28px;
    display: flex;
    margin-right: 20px;

    .icon {
      cursor: pointer;
      font-size: 28px;
      line-height: 28px;
      color: $icon;
      margin: auto;

      &:hover {
        color: $primary;
      }
    }
  }
</style>
