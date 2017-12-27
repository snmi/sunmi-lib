/**
 * [convertListToObject description]
 * @param  {[type]} oldList [description]
 * @param  {[type]} newObjectMapString [description]
 * @return {[type]}       [description]
 */
export default function convertListToObject(oldList, newObjectMapString) {
  // debugger
  if (!oldList) {
    throw new Error(
      `请指定要转换的数组oldList`
    )
  }

  if (newObjectMapString.indexOf(':') < 0) {
    throw new Error(
      `请指定newObjectMapString,例如 'id:name'`
    )
  }

  const [newObjectKey, newObjectValue] = newObjectMapString.split(':')

  let object = {}

  oldList.map(function (item) {

    const key = item[newObjectKey]

    if (!key) {
      throw new Error(
        `oldList数据不完整，请检查key${newObjectKey}'`
      )
    }

    const value = item[newObjectValue]

    switch (newObjectValue) {
    case '_self':
      object[key] = item
      break
    default:
      object[key] = value
      break
    }

  })

  return object
}
