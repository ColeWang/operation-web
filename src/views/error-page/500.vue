<template>
  <error-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src"></error-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import error500 from '@/assets/images/error-page/error-500.svg'
  import ErrorContent from './ErrorContent.vue'

  export default defineComponent({
    name: 'error-500',
    components: {
      ErrorContent
    },
    setup () {
      const src: any = error500

      return {
        src
      }
    }
  })
</script>
