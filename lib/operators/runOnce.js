/**
 * [runOnce description]
 * @param  {Function} fn      [description]
 * @param  {[type]}   context [description]
 * @return {[type]}           [description]
 */
export default function runOnce(fn, context) {
  var result, times = 0

  return function () {
    times++
    if (fn) {
      result = fn.apply(context || this, arguments)
      if (times === 1) {
        fn = null
      }
    }

    return result
  }
}

