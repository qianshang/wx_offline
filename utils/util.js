const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const mmddeeeHHmmZH = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = getWeekDay(date)
  const hour = date.getHours()
  const minute = date.getMinutes()

  return month.toString() + '月' + day.toString() + '日' + '('+ week +') ' + [hour, minute].map(formatNumber).join(':')
}

const mmddeeeHHmmZH_tiestamp = n => {
  if (n.toString().length > 10) {
    return mmddeeeHHmmZH(new Date(n))
  }
  return mmddeeeHHmmZH(new Date(n * 1000))
}

const getWeekDay = date => {
  return weekDays[date.getDay()]
}

const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ]

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  mmddeeeHHmmZH: mmddeeeHHmmZH,
  mmddeeeHHmmZH_tiestamp: mmddeeeHHmmZH_tiestamp
}
