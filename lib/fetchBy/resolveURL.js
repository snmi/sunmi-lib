import { getAPI } from './api'
import convertListToObject from '../filters/convertListToObject'
import { defaultHost, NODE_ENV, NODE_HOST, modulePaths } from '../config'

function getPrefix(env, host, path, api) {
  let _host
  let httpPrefix

  if (NODE_ENV !== 'production') {
    _host = env === undefined ? ( defaultHost === undefined ? [] : [defaultHost] ) : [env]
    httpPrefix = 'http'
  } else {
    _host = env === undefined ? [] : [env]
    httpPrefix = (!env || env==='uat') ? 'https' : 'http'
  }

  const hosts = convertListToObject(modulePaths, 'value:_self')
  const currentHost = hosts[host]
  if (!currentHost) {
    throw new Error(
      '请检查配置文件' + JSON.stringify(host)
    )
  }

  _host.push(currentHost.label)
  const paths = convertListToObject(currentHost.children, 'value:_self')
  const currentPath = paths[path].label
  if (!currentPath) {
    throw new Error(
      `请设置正确的模块路径，当前为${path}`
    )
  }

  return `${httpPrefix}://${_host.join('.')}${currentPath}${api}`
}

/**
 * [URL description]
 * @param {[type]} api [description]
 */
export default function resolveURL(api) {
  const API = getAPI()
  if (!API[api]) {
    throw new Error(
      `未定义的接口${api},请在[api层]添加接口定义`
    )
  }

  const { pathArray } = API[api]
  if (!pathArray) {
    throw new Error(
      `请设置${api}的pathArray属性`
    )
  }
  const [host, path] = pathArray
  if (!host || !path) {
    throw new Error(
      `请设置${api}的正确的pathArray属性`
    )
  }
  const HOST = host || 'webapi'
  if (!HOST) {
    throw new Error(
      `请设置${api}的正确的pathArray属性或者查看配置文件`
    )
  }

  return getPrefix(NODE_HOST, host, path, api)
}
