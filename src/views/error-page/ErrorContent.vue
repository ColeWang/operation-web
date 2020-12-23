<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <a-space class="back-btn-group" :size="10">
        <a-button @click="backHome">返回首页</a-button>
        <a-button @click="backPrev">返回上一页({{ second }}s)</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter, Router } from 'vue-router'

  export default defineComponent({
    name: "ErrorContent",
    props: {
      code: String,
      desc: String,
      src: String
    },
    setup() {
      const router: Router = useRouter()
      const second: Ref<number> = ref(5)
      let timer: number | null = null

      function backHome(): void {
        router.replace({ name: 'home' })
      }

      function backPrev(): void {
        router.go(-1)
      }

      onMounted(() => {
        timer = setInterval(() => {
          if (second.value === 0) {
            backPrev()
          } else {
            second.value--
          }
        }, 1000)
      })

      onBeforeUnmount(() => {
        clearInterval((timer as number))
      })

      return {
        backHome,
        backPrev,
        second
      }
    }
  })
</script>

<style scoped lang="scss">
  .error-page {
    width: 100%;
    height: 100%;
    position: relative;
    background: $background;

    .content-con {
      width: 700px;
      height: 600px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);

      img {
        width: 100%;
        height: 100%;
      }

      .text-con {
        position: absolute;
        left: 0;
        top: 0;

        h4 {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 80px;
          font-weight: 700;
          color: $primary;
        }

        h5 {
          position: absolute;
          width: 700px;
          left: 0;
          top: 100px;
          font-size: 20px;
          font-weight: 700;
          color: $text-secondary;
        }
      }

      .back-btn-group {
        position: absolute;
        right: 0;
        bottom: 20px;
      }
    }
  }
</style>
