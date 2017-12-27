export default function formatDate(date) {
  let newdate
  date = new Date(Number(date * 1000))
  let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let time = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  newdate = date.getFullYear() + '-' + month + '-' + day + '  ' + hours + ':' + time
  return newdate
}
