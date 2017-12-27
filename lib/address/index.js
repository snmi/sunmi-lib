import * as datas from './data.json'
/**
 * 地址编码解析
 * @param  province 省id
 * @param  city     市id
 * @param  country  城镇id
 * @return result   解析后的字符串
 */
// import('./data').then()
export default function analyseAddr(province, city, country) {
  if (!province)
    return ""

  let provinceName = ""
  let cityName = ""
  let countryName = ""

  //解析province
  datas.map((item) => {
    if (item.id == province) {
      provinceName = item.name

      //解析city
      item.children && item.children.map((item) => {
        if (item.id == city) {
          cityName = item.name

          //解析country
          item.children && item.children.map((item) => {
            if (item.id == country) {
              countryName = item.name
            }
          })
        }
      })
    }
  })

  return provinceName + cityName + countryName
}
