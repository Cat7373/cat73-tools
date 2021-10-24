import axios from 'axios'

// Axios 公共请求包装
const service = axios.create({
  timeout: 30000,
})

export default service
