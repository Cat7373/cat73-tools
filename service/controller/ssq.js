import nodeHtmlParser from 'node-html-parser'
import { ssqHistory as fetchSsqHistory } from '../api/ssq.js'

/**
 * 将字符串转换为 Number，并自动忽略中间的逗号
 * @param {String} str 被处理的字符串
 * @returns 转换后的数字
 */
function paeseNumber(str) {
    return parseInt(str.replaceAll(',', ''))
}

/**
 * 查询双色球开奖记录
 * @returns 双色球开奖记录列表
 */
async function ssqHistory() {
    const { data } = await fetchSsqHistory()
    const dom = nodeHtmlParser.parse(data)
    const tdata = dom.querySelector('#tdata').childNodes
            .filter(node => node instanceof nodeHtmlParser.HTMLElement)
    const result = tdata.map(tr => {
        const vals = tr.childNodes.map(td => td.innerText)

        return {
            // 第几期
            no: paeseNumber(vals[0]),
            // 红球
            reds: [paeseNumber(vals[1]), paeseNumber(vals[2]), paeseNumber(vals[3]), paeseNumber(vals[4]), paeseNumber(vals[5]), paeseNumber(vals[6])],
            // 篮球
            blue: paeseNumber(vals[7]),
            // 奖池奖金
            jackpot: paeseNumber(vals[9]),
            // 一等奖注数
            firstPrizeCount: paeseNumber(vals[10]),
            // 一等奖奖金(单注)
            firstPrizeMoney: paeseNumber(vals[11]),
            // 二等奖注数
            secondPrizeCount: paeseNumber(vals[12]),
            // 二等奖奖金(单注)
            secondPrizeMoney: paeseNumber(vals[13]),
            // 总投注额
            bettingAmount: paeseNumber(vals[14]),
            // 开奖日期
            date: vals[15]
        }
    })

    return result
}

/**
 * 判断中了几等奖，两个参数反过来传也可
 * @param {*} r1 开奖结果
 * @param {*} r2 投注数字
 * @returns 中了几等奖，未中奖则返回 0
 */
function checkBoundLevel(r1, r2) {
    const { reds: reds1, blue: blue1 } = r1
    const { reds: reds2, blue: blue2 } = r2

    let red = 0
    let blue = blue1 === blue2 ? 1 : 0
    for (let a of reds1) {
        for (let b of reds2) {
            if (a == b) {
                red += 1
                break
            }
        }
    }

    if (red === 6 && blue === 1) return 1
    if (red === 6 && blue === 0) return 2
    if (red === 5 && blue === 1) return 3
    if (red === 5 && blue === 0) return 4
    if (red === 4 && blue === 1) return 4
    if (red === 4 && blue === 0) return 5
    if (red === 3 && blue === 1) return 5
    if (blue === 1) return 6

    return 0
}

/**
 * 随机一注双色球
 * @returns 随机出的双色球
 */
function randomSsq() {
    let redPool = []
    for (let i = 1; i <= 33; i++) {
        redPool.push(i)
    }

    let blue = Math.floor(Math.random() * 16 + 1)
    let reds = []
    for (let i = 0; i < 6; i++) {
        const idx = Math.floor(Math.random() * redPool.length)
        reds.push(redPool.splice(idx, 1)[0])
    }
    reds.sort((a, b) => a - b)

    return { reds, blue }
}

// TODO 参数处理
// TODO cache && schedule
// TODO 每个奖项上次中奖的时间？
// TODO 历史上每期都投的成本、收益
// TODO UI 页面
/**
 * 随机双色球号码并基于历史开奖记录分析
 */
async function random(ctx) {
    const openHistorys = await ssqHistory()
    const randomResults = [] // 随机出的双色球
    const analysisResults = [] // 历史上的开奖结果
    for (let i = 0; i < 5; i++) {
        const ssq = randomSsq()
        const analysisResult = {}
        randomResults.push(ssq)
        analysisResults.push(analysisResult)
        openHistorys.forEach(openHistory => {
            const level = checkBoundLevel(ssq, openHistory)
            if (level === 0) return
            analysisResult[level] = (analysisResult[level] || 0) + 1
        })
    }

    ctx.body = { randomResults, analysisResults }
}

export default {
    random
}
