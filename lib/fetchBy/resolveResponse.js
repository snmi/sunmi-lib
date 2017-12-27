/* eslint-disable no-alert, no-console */

import log from '../log'
import { getAPI } from './api'

export default function resolveResponse({ url, body, api }) {

  function resolveJSON() {
    const API = getAPI()
    const { response } = API[api]
    if (!response) {
      throw new Error(
        `[接口定义错误]：请注明${api}的返回值约束数组的参数项response,且response.dataType只能是'object', 'array', 'null', 'string'其中一个`
      )
    }

    switch (response.dataType) {
    case 'object':
    case 'array':
    case 'null':
    case 'string':
    default:
      break
    }
  }

  function logApi({ json }) {
    log(`\n%c[ ${api} ]`, 'color:blue')
    log('req:', body)
    log('res:', json)
    log('url:', url)
  }

  function responseCheck(json) {
    const { code, data, msg } = json
    if (process.env.NODE_ENV !== 'production') {
      if (code != 1) {
        log(msg, data)
      }
      resolveJSON({ code, data, msg })
      logApi({ json })
    } else {
      console.clear()
    }
  }

  function resolveText(res) {
    return new Promise((resolve) => {
      res.clone().text().then(text => {
        let json
        try {
          json = JSON.parse(text)
        } catch (e) {
          json = {
            code: -1,
            data: text,
            msg: '服务器接口错误！'
          }
          throw new Error(
            `服务器接口错误，${text.substring(0,100)}`
          )
        } finally {
          //responseCheck(json)
          resolve(res)
        }
      })
    })
  }

  return { resolveText, responseCheck }

}
