export default function converTime(timeString) {
  if (!timeString) {
    return '-'
  }
  if (typeof timeString == 'string' && timeString.match('-')) {
    return timeString.substring(0, 10)
  } else {
    return new Date(parseInt(timeString) * 1000).toLocaleDateString()
  }
}

