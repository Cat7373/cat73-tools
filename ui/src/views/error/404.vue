<template lang="pug">
span 您输入的地址不存在，
  a(href="javascript:void(0)", @click="back") 点击返回主页({{ timeout }})
</template>

<script>
export default {
  name: '404',
  data() {
    return {
      timer: 0,
      timeout: 10,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.timeout--
      if (this.timeout === 0) {
        this.back()
      }
    }, 1000)
  },
  beforeUnmounted() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = 0
    }
  },
  methods: {
    back() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
