<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"></error-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import error404 from '@/assets/images/error-page/error-404.svg'
  import ErrorContent from './ErrorContent.vue'

  export default defineComponent({
    name: 'error-404',
    components: {
      ErrorContent
    },
    setup () {
      const src: any = error404

      return {
        src
      }
    }
  })
</script>
