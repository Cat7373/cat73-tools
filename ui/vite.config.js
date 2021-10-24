import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Vite Vue Base
    vue(),
    // Element-Plus 自动按需引入
    ElementPlus({ useSource: true }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 打包结果体积分析
    {
      ...visualizer({
        filename: 'dist/report.html',
        gzipSize: true,
      }),
      apply: 'build',
    },
  ],
  resolve: {
    alias: [
      // 支持 @/xxx 的写法
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    // 不输出 brotli 压缩后的体积，提高构建速度
    // 服务端目前不支持此压缩方式
    brotliSize: false
  },
  server: {
    // 开发服务器代理
    proxy: {
      '/api': 'http://localhost:3001',
    }
  },
})
