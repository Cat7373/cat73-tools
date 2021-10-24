<template lang="pug">
span 您输入的地址不存在，
  a(href="javascript:void(0)", @click="back") 点击返回主页({{ timeout }})
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import router from '@/router'

// 返回超时时间
let timeout = ref(10)
// 定时器句柄
let timer = 0

// 返回首页
const back = () => {
  router.push({ path: '/' })
}

// 超时后自动返回的定时器
timer = setInterval(() => {
  timeout.value -= 1
  if (timeout.value <= 0) {
    back()
  }
}, 1000)

// 清理定时器
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
