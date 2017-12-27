/**
 * @description [去除字符串前后的空格]
 * @param {string} str 待处理的字符串
 * @return 处理后的字符串
 * @example trimStr(' aa ')//'aa'
 */
export default function trimStr(str){
    let newstr
    newstr = str.replace(/(^\s*)|(\s*)$/g,'')
    return newstr
}