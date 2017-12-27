/**
 * sessionStorage 操作对象
 */

import encodeURL from '../secure/encodeURL'
import decodeURL from '../secure/decodeURL'

export default {
  /**
   * [description]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  set: (key, value) => {
    key = encodeURL(key)
    sessionStorage.setItem(key, encodeURL(value))
  },
  /**
   * [description]
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  get: (key) => {
    key = encodeURL(key)
    if (sessionStorage.hasOwnProperty(key)) {
      return decodeURL(sessionStorage.getItem(key))
    } else {
      return false
    }
  },
  /**
   * [description]
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  remove: (key) => {
    key = encodeURL(key)
    if (sessionStorage.hasOwnProperty(key)) {
      sessionStorage.removeItem(key)
    } else {
      return false
    }
  },
  /**
   * [description]
   * @return {[type]} [description]
   */
  clear: () => {
    sessionStorage.clear()
  }
}
