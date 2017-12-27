import md5 from 'md5'
import { isEncrypted, md5Key } from '../config'

/**
 * [signEncode description]
 * @param  {[type]} form [description]
 * @return {[type]}      [description]
 */
export default function signEncode(form) {

  if (!md5Key || !md5Key[(isEncrypted())]) {
    throw new Error('请检查配置文件！')
  }

  const key = md5Key[(isEncrypted())]
  const { params, timeStamp, randomNum } = form
  return md5(params + isEncrypted() + timeStamp + randomNum + md5(key))
}
