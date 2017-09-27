import fetch from 'isomorphic-fetch';

/**
 * 获取API的函数
 * @param  {string} api  'app/'定义的接口
 * @param  {Object} opts fetch的option
 * @return {Promise}
 */
export default async function fetchToolServer(api: string, opts: Object) {
  const url = `http://tool.briefguo.com:3008${api}`;
  const json = await fetch(url, opts);
  return json;
}
