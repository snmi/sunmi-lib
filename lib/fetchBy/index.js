import { message } from 'antd'
import { setAPI } from './api'
import resolveURL from './resolveURL'
import resolveParams from './resolveParams'
import resolveResponse from './resolveResponse'

import fetch from 'isomorphic-fetch'

/**
 * 获取API的函数
 * @param  {string} api  'app/api'定义的接口
 * @param  {Object} opts fetch的option
 * @param  {bool}   unuseJson 返回未json格式化的数据
 * @return {Promise}
 */
export default function fetchBy(api, opts, unuseJson) {

  const { method, body } = opts

  /****** start: 测试时使用 *****/
  let url
  if (api.indexOf('http://') !== -1 || api.indexOf('https://') !== -1) {
    url = api
  } else {
    url = resolveURL(api)
  }

  const formData = resolveParams(api).use(body)
  /****** end ：测试时使用 *****/

  var myFormData = new FormData()
  for (var i in formData) {
    myFormData.append(i, formData[i])
  }

  const options = {
    ...opts,
    method,
    body: myFormData
  }

  if (!formData) {
    delete options.body
  }

  return new Promise((resolve, reject) => {
    //返回原始请求数据
    if(unuseJson){
      fetch(url, options)
        .then(function (res) {
          resolve(res)
        })
        .catch(err => {
          message.error(`网络异常${err}`)
          reject(err)
        })
    }
    //返回json格式化的数据
    else{
      fetch(url, options)
        .then(function (res) {
          return resolveResponse({ url, api, body }).resolveText(res.clone())
        })
        .then(res => {
          res.clone().text().then(text => {
            let json
            try {
              json = JSON.parse(text)
              if(json.code==1){
                resolve(res)
              }else{
                reject(json)
              }
            } catch (e) {
              json = {
                code: 'serverError',
                data: text,
                msg: '服务器接口错误！'
              }
              reject(json)
            }
          })
        })
        .catch(err => {
          message.error(`网络异常${err}`)
          reject(err)
        })
    }
  })
}

export function init(apis){
  setAPI(apis)
}
