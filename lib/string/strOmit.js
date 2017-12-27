/**
 * @description 截取固定长度的字符串，如果字符串中带有中文，则按双字节处理，一个中文字符占两个长度单位
 * @param {string} str 待处理的字符串,默认为空字符串
 * @param {number} maxLen 字符串要保留的长度，默认30
 * @return {object} 返回一个对象，对象包含omitstr,overmax两个属性
 *      --omitstr [string]截取后的字符串
 *      --overmax [boolean]传入的字符串是否超出了maxLen规定的长度
 */
export default function strOmit(str='',maxLen=30){
    let reg = /[^\x00-\xff]/g
    let newstr,doubleChars,count=0,omitstr,overmax = false
    // strArr = str.split('')
    // console.log(strArr)
    // strArr.replce()
    newstr = str.replace(reg,'**').substring(0,maxLen)
    doubleChars = newstr.match(/\*\*/g)
    if(doubleChars){
        count = doubleChars.length
    }
    maxLen -=count
    if(str.length>maxLen){
        overmax = true
        omitstr = str.substring(0,maxLen) +'...'
    }else{
        omitstr = str
    }
    
    return {omitstr,overmax}
}