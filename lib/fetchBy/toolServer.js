import { remoteServer } from '../config'
import fetch from 'isomorphic-fetch'

/**
 * 获取API的函数
 * @param  {string} api  'app/'定义的接口
 * @param  {Object} opts fetch的option
 * @return {Promise}
 */
export default function fetchByToolServer(api, opts) {
  const url = `${remoteServer}${api}`
  return fetch(url, opts)
}
