<template>
  <div class="home" v-watermark>
    <a-button @click="onSubmit" :loading="loading">按钮</a-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue'
  import { pendingEffect } from '@/util/pendingEffect'

  export default defineComponent({
    name: 'Home',
    setup () {
      const loading: Ref<boolean> = ref(false)

      function submit () {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }

      const onSubmit: Function = pendingEffect(loading, submit)

      return {
        loading,
        onSubmit
      }
    }
  })
</script>

<style scoped lang="scss">
  .home {
    height: 1500px;
    background: $white;
  }
</style>
