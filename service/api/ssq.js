import request from '../utils/request.js'

// 从 500.com 请求双色球开奖历史
export function ssqHistory() {
  return request({
    url: 'https://datachart.500.com/ssq/history/newinc/history.php?start=00001&end=99999',
    method: 'get',
    responseType: 'text',
  })
}
