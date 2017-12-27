/**
 * 字节数转文件大小
 * @param  bytes 			字节数，必须
 * @param  rounding		保留小数点后几位，默认两位，可选
 * @param  shortUnit	是否使用短单位，默认为false，可选
 * @param  fixedUnit 	固定单位，可选
 * @param  minUnit 		最小单位，可选
 * @param  useObject  返回结果是否以对象方式返回, 默认false，返回字符串
 *
 * eg:
 * 		1024 => '1KB'
 * 		1024 => { num: 1, unit: 'KB' }
 * 
 */
export default function bytesToSize({ bytes, rounding, shortUnit, fixedUnit, minUnit, useObject }){
	if(isNaN(parseInt(bytes)))
		return useObject ? { num:'', unit: '' } : ''

	const unitConf = {
		default: ['B', 'KB', 'MB', 'GB', 'TB'],
		short: ['B', 'K', 'M', 'G', 'T']
	}

	bytes = parseInt(bytes)
	const units = shortUnit ? unitConf['short'] : unitConf['default']
	const round = isNaN(parseInt(rounding)) ? 2 : rounding
	const calc = {
		'B': function(bytes){
			let num = bytes
			let unit = fixedUnit || units[0]
			return  { num, unit }
		},
		'K': function(bytes){
			let num = (bytes/1024).toFixed(round)
			let unit = fixedUnit || units[1]
			return  { num, unit }
		},
		'M': function(bytes){
			let num = (bytes/1024/1024).toFixed(round)
			let unit = fixedUnit || units[2]
			return  { num, unit }
		},
		'G': function(bytes){
			let num = (bytes/1024/1024/1024).toFixed(round)
			let unit = fixedUnit || units[3]
			return  { num, unit }
		},
		'T': function(bytes){
			let num = (bytes/1024/1024/1024/1024).toFixed(round)
			let unit = fixedUnit || units[4]
			return  { num, unit }
		}
	}

	//根据bytes或unit确认计算方式
	let method = 'M'
	if( fixedUnit && (unitConf['default'].indexOf(fixedUnit.toUpperCase())!==-1 || unitConf['short'].indexOf(fixedUnit.toUpperCase())!==-1) ){
		method = fixedUnit.substr(0,1).toUpperCase()
	}else{
		let minUnitIndex = 0
		if( minUnit && (unitConf['default'].indexOf(minUnit.toUpperCase())!==-1 || unitConf['short'].indexOf(minUnit.toUpperCase())!==-1) ){
			minUnitIndex = unitConf['short'].indexOf(minUnit.substr(0,1).toUpperCase())
		}

		if( unitConf['short'].indexOf('B')>=minUnitIndex && bytes<1024 ){
			method = 'B'
		}else if( unitConf['short'].indexOf('K')>=minUnitIndex && bytes < 1024*1024){
			method = 'K'
		}else if( unitConf['short'].indexOf('M')>=minUnitIndex && bytes< 1024*1024*1024){
			method = 'M'
		}else if( unitConf['short'].indexOf('G')>=minUnitIndex && bytes< 1024*1024*1024*1024){
			method = 'G'
		}else if( unitConf['short'].indexOf('T')>=minUnitIndex && bytes< 1024*1024*1024*1024*1024 ){
			method = 'T'
		}
	}

	const result = calc[method](bytes)
	return useObject ? result : result['num']+result['unit']
}
