import io from 'socket.io-client'

/**
 * socket初始化参数
 * https://socket.io/docs/client-api/
 *
 * {
 *    transports,           //请求方式,顺序敏感
 *    reconnection,         //是否重连 默认：true
 *    reconnectionAttempts, //重连次数 默认：无穷次 Infinity
 *    reconnectionDelay,    //重连时间间隔   默认：1000
 *    reconnectionDelayMax  //重新连接的最大等待时间  默认：5000
 * }
 *
 */
const opts = {
  transports: ['websocket'],
  reconnectionDelayMax: 2000,
  reconnectionAttempts:5
}

function log(...args){
  if(process.env.NODE_ENV!=='production'){
    console.log(...args)
  }
}

export default class Socket {
  constructor(url, uid) {
    if (!url || !uid) {
      throw { message: 'Socket 连接参数错误' }
    }
    this.uid = uid
    this.url = url
    this.socket = null
  }

  /**
   * 连接
   */
  connect() {
    //请求连接
    this.socket = io(this.url, opts)

    /********* 监听socket状态 **********/

    //连接成功
    this.socket.on('connect', () => {
      log(`连接成功：${this.url}`)
    })

    //监听服务器是否断开连接
    this.socket.on('disconnect', function () {
      log('连接断开')
    });

    //监听重连请求
    this.socket.on('reconnecting', function () {
      log('正在重连...')
    })

    //监听重连成功请求
    this.socket.on('reconnect', () => {
      log('重连成功')
    })

    //监听重连失败请求，重连次数用完后调用
    this.socket.on('reconnect_failed', function () {
      log('重连失败')
    })
  }

  /**
   * 监听事件
   * @param evantName  事件名
   * @param callback   回调
   *
   * 支持callback和promise两种方式
   *
   * eg1：用于多次监听
   *   socket.on('eventName', (res)=>{ ... })
   *
   * eg2: 用于单次等待响应的监听
   *   socket.on('eventName').then((res)=>{ ... })
   */
  on(eventName, callback) {
    const exceptEvent = ['reconnect', 'reconnect_failed']
    //注销上次的事件
    if(exceptEvent.indexOf(eventName)===-1){
      this.socket.removeListener(eventName)
    }

    if(callback){
      this.socket.on(eventName, (res)=>{
        callback(res)
      })
    }else{
      return new Promise((resolve) => {
        this.socket.on(eventName, (res)=>{
          let data
          if(typeof res == 'string'){
            data = res ? JSON.parse(res) : ""
          }else{
            data = res
          }
          resolve(data)
          log(`接收事件：${eventName}`, data)
        })
      })
    }
  }

  /**
   * 发送事件
   * @param evantName  事件名
   * @param params     参数
   */
  emit(eventName, params) {
    this.socket.emit(eventName, params)
    log(`发送事件：${eventName}`, params)
  }

  /**
   * 关闭连接
   */
  close(){
    this.socket.close()
    log('连接关闭')
  }
}

// export function listenNewMessage(){

// }
