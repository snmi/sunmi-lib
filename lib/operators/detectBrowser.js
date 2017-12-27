/**
 * 检测浏览器
 *
 * 待优化：这里先用通用方法，后期使用专用的包处理
 * lwf 2017/8/9
 */
export default function detectBrowser(){
	let browser = ''
	let version = '0'

	try{
		const userAgent = navigator.userAgent
		
		if(userAgent.indexOf('Firefox') > -1){
      browser = 'Firefox'
      version = userAgent.substr(userAgent.indexOf("Firefox")).split('/')[1]   
    }else if(userAgent.indexOf('Chrome') > -1){
    	browser = 'Chrome'
    	version = userAgent.substr( userAgent.indexOf("Chrome"), userAgent.substr(userAgent.indexOf("Chrome")).indexOf(" ") ).split("/")[1]
  	}else if(userAgent.indexOf("Safari") > -1){
    	browser = 'Safari'
    	version = userAgent.substr(userAgent.indexOf("Version"), userAgent.substr(userAgent.indexOf("Version")).indexOf(" ")).split("/")[1]
    }else if(userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11') > -1){
			browser = 'IE'
			version = '11'
    }else if(userAgent.indexOf('MSIE') > -1 && userAgent.indexOf('Trident') > -1){
    	browser = 'IE'
    	version = (userAgent.substr(userAgent.indexOf("MSIE") + 4, 4)) * 1
    }
	}catch(e){}

	return { browser, version }
}