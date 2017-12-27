// API接口定义JSON
import { isEncrypted } from '../config'
import { getAPI } from './api'
import paramsEncode from './paramsEncode'
import signEncode from './signEncode'
import { Cookie } from '../storages'

/**
 * [Params description]
 * @param {[type]} api [description]
 */
export default function resolveParams(api) {

  var _this = {}

  _this.use = params => {

    const currentParams = params

    if (!currentParams) {
      return false
    }

    const API = getAPI()

    if (API[api]) {
      const { required } = API[api]

      if (!currentParams instanceof Object) {
        throw new Error(
          `[参数]当前参数body不是Object，请检查`
        )
      }

      // 必要请求参数检测
      required.map(item => {
        if (!currentParams.hasOwnProperty(item)) {
          throw new Error(
            `[参数]缺少参数${item}，请检查函数fetchBy('${api}',...)`
          )
        }
      })
    }

    var formData = {}
    if (currentParams.hasOwnProperty('file')) {
      formData.file = currentParams.file
      delete currentParams.file
    }
    formData.timeStamp = Math.floor(new Date().getTime() / 1000)
    formData.randomNum = Math.floor(Math.random() * 1000000)
    formData.isEncrypted = isEncrypted()
    formData.params = paramsEncode(currentParams)
    formData.sign = signEncode(formData)
    formData.lang = Cookie.getItem('lang')

    return formData
  }

  return _this
}
