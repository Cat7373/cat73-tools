<template lang="pug">
el-config-provider(:locale="locale")
  router-view
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data() {
    return {
      locale: zhCn
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
