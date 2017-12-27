/**
 * 用于检测当前浏览器环境
 * lwf 2017-09-05
 */

const userAgent = window.navigator.userAgent

//苹果检测
const IS_MAC      = /Mac/i.test(userAgent)
const IS_IPAD     = /iPad/i.test(userAgent)
const IS_IPHONE   = /iPhone/i.test(userAgent) && !IS_IPAD
const IS_IPOD     = /iPod/i.test(userAgent)
const IS_IOS      = IS_IPHONE || IS_IPAD || IS_IPOD
const IOS_VERSION = function(){
  let version = userAgent.match(/OS (\d+)_/i)
  return version && version[1] ? version[1] : null
}()

//安卓检测
const IS_ANDROID       = /Android/i.test(userAgent)
const ANDROID_VERSION  = function(){
  let version = userAgent.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i)
  let num1st, num2nd

  if(!version)
    return null

  num1st = version[1] && parseFloat(version[1])
  num2nd = version[2] && parseFloat(version[2])

  if(num1st && num2nd){
    return parseFloat(`${version[1]}.${version[2]}`)
  }else if(num1st){
    return num1st
  }else{
    return null
  }
}()
const IS_OLD_ANDROID    = IS_ANDROID && /webkit/i.test(userAgent) && ANDROID_VERSION < 2.3

//常用浏览器检测
const IS_FIREFOX  = /Firefox/i.test(userAgent)
const IS_EDGE     = /Edge/i.test(userAgent)
const IS_CHROME   = !IS_EDGE && /Chrome/i.test(userAgent)
const IS_SAFARI   = !IS_CHROME && /Safari/i.test(userAgent)
const IS_IE8      = /MSIE\s8\.0/.test(userAgent)
const IS_IE9      = /MSIE\s9\.0/.test(userAgent)
const IS_IE       = /(msie\s|trident.*rv:)([\w.]+)/i.test(userAgent)
const IE_VERSION  = function () {
  let version = userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/i)
  return version ? version[2] : null
}()

//flash检测
let FLASH_VERSION       = null
const IS_FLASH_ENABLED  = function(){
  let flash
  if (document.all || IS_IE) {
    try {
      flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
      if (flash) {
        FLASH_VERSION = flash.GetVariable("$version").split(" ")[1].replace(/,/g, ".")
        return true
      }
    } catch (e) {
      return false
    }
  } else {
    try {
      if (navigator.plugins && navigator.plugins.length > 0) {
        flash = navigator.plugins["Shockwave Flash"]
        if (flash) {
          var n = flash.description.split(" ")
          for (var i = 0; i < n.length; ++i) {
            if (isNaN(parseInt(n[i])))
              continue
            FLASH_VERSION = n[i]
          }
          return true
        }
      }
    } catch (e) {
      return false
    }
  }
  return false
}()

export default {
  IS_MAC,
  IS_IPAD,
  IS_IPOD,
  IS_IPHONE,
  IS_IOS,
  IOS_VERSION,
  IS_ANDROID,
  IS_OLD_ANDROID,
  ANDROID_VERSION,
  IS_FIREFOX,
  IS_EDGE,
  IS_CHROME,
  IS_SAFARI,
  IS_IE8,
  IS_IE9,
  IS_IE,
  IE_VERSION,
  FLASH_VERSION,
  IS_FLASH_ENABLED
}