/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'
const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish } = data

  let text = `早上好呀，我可爱的${CONFIG.girl_name}~\n`

  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  if (!['星期六', '星期日'].includes(week)) {
    text += `
臭宝臭宝，起床啦🌹
今天又是想宝宝的一天哦～记得要吃早饭呀😆
嗯哼哼~今天可是${week}哦，上班别迟到了哦~\n`
  } else {
    text += `
早上好呀！亲爱的老婆～
嗯哼~，既然今天是${week}，就让你再睡会懒觉~😝\n`
  }

  // 添加笑话
  if (CONFIG.caiHongpi && caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (CONFIG.sayLove && sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  if (CONFIG.songLyrics && songLyrics) {
    text += `
『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (CONFIG.oneMagazines && oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (CONFIG.netEaseCloud && netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  if (CONFIG.oneWord && oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (CONFIG.dayEnglish && dayEnglish) {
    text += `
『每日英语（${dayjs(dayEnglish.date).format('ll')}』
${dayEnglish.content}`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
