import Des from '../secure/Des'
import { isEncrypted } from '../config'

/**
 * [paramsEncode description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export default function paramsEncode(params) {
  params = JSON.stringify(params)
  if (isEncrypted()) {
    return encodeURIComponent(Des.encrypt(params))
  } else {
    return params
  }
}
