/**
 * 文件大小字符串转字节数
 * @param  number 	数字位
 * @param  unit   	单位
 *
 * eg: '1KB' => 1024
 * 注：由于文件大小字符串格式没有统一，需要调用者手动拆分参数
 */
export default function sizeToBytes(number, unit){
	if(isNaN(parseInt(number)))
		return 0

	if(!unit)
		return number

	switch(unit.toUpperCase()){
		case 'B':
			return +number
		case 'K':
		case 'KB':
			return Math.round((+number)*1024)
		case 'M':
		case 'MB':
			return Math.round((+number)*1024*1024)
		case 'G':
		case 'GB':
			return Math.round((+number)*1024*1024*1024)
		default:
			return 0
	}
}