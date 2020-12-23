<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src"></error-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import error401 from '@/assets/images/error-page/error-401.svg'
  import ErrorContent from './ErrorContent.vue'

  export default defineComponent({
    name: 'error-401',
    components: {
      ErrorContent
    },
    setup () {
      const src: any = error401

      return {
        src
      }
    }
  })
</script>
