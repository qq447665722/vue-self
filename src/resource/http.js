import Vue from 'Vue'
import vueResource from 'vue-resource'
import service from './service'
import { sending, responsive } from '../config/interceptors'

Vue.use(vueResource)
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  sending(request, next)
  next((response) => {
    // 请求发送后的处理逻辑
    responsive(response)
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
})


export default {
  // cache 机制
  cache: [],
  // 默认300秒数据缓存时间
  exp: 300,
  getCache (url, exp) {
    //url最后为数字,无法缓存,所以后加无意义字符
    url += 'url'
    let json = this.cache[url]
    exp      = exp ? exp : this.exp
    return (json && (json.cached_at >= this.timestamp() - exp)) ? json.data/**.toJS()**/ : null
  },
  setCache (url, data) {
    // 默认300秒,{data,exp}
    //url最后为数字,无法缓存,所以后加无意义字符
    url += 'url'
    // data            = Immutable.fromJS(data)
    this.cache[url] = {data: data, cached_at: this.timestamp()}
  },
  $resource(model, method, callback, callerr, force = false, exp = this.exp){
    let self = this
    let url  = service.base + '/' + model
    let param
    if (typeof(method) == 'object') {
      let key = Object.keys(method).shift();
      param   = method[key]
      method  = key
    }
    switch (method) {
      case 'post':
        if (param.data == undefined) {
          param = param.data
        }
        Vue.http.post(url, param).then((response)=> {
          callback(response.data)
        }, (response)=> {
          if (callerr) {
            callerr(response)
          } else {
            self.ajaxerr(response)
          }
        })
        break
      case 'put':
        url += '/' + param.id
        Vue.http.put(url, param.data).then(function (response) {
          callback(response.data)
        }, function (response) {
          if (callerr) {
            callerr(response)
          } else {
            self.ajaxerr(response)
          }
        })
        break
      case 'delete':
        if (!isNaN(param)) {
          url += '/' + param
        } else {
          url += '/' + param.id
        }
        Vue.http.delete(url).then((response)=> {
          callback(response.data)
        }, (response)=> {
          if (callerr) {
            callerr(response)
          } else {
            self.ajaxerr(response)
          }
        })
        break
      default:
        if (!isNaN(param)) {
          url += '/' + param
        }
        let data = self.getCache(url, exp)
        if (!data || force) {
          Vue.http.get(url, {}, {}).then((response) => {
            // response.data = Immutable.Map(response.data);
            callback(response.data, true)
            self.setCache(url, response.data)
          }, (response) => {
            if (callerr) {
              callerr(response)
            } else {
              self.ajaxerr(response)
            }
          })
        } else {
          callback(data, false)
        }
    }
  },
  //get处理
  $get(ajaxurl, callback, callerr, force = false, exp) {
    let self = this
    let data = self.getCache(ajaxurl, exp)
    if (!data || force) {
      Vue.http.get(ajaxurl, {}, {}).then((response) => {
        // response.data = Immutable.Map(response.data);
        callback(response.data, true)
        self.setCache(ajaxurl, response.data)
      }, (response) => {
        if (callerr) {
          callerr(response)
        } else {
          self.ajaxerr(response)
        }
      })
    } else {
      callback(data, false)
    }
  },
  // post带鉴权，不使用缓存
  $post (ajaxurl, param, callback, callerr) {
    let self = this
    Vue.http.post(ajaxurl, param).then((response)=> {
      // response.data = Immutable.Map(response.data);
      callback(response.data)
    }, (response)=> {
      if (callerr) {
        callerr(response)
      } else {
        self.ajaxerr(response)
      }
    })
  },
  //put
  $put (ajaxurl, param, callback, callerr) {
    let self = this
    Vue.http.put(ajaxurl, param).then((response)=> {
      // response.data = Immutable.Map(response.data);
      callback(response.data)
    }, (response)=> {
      if (callerr) {
        callerr(response)
      } else {
        self.ajaxerr(response)
      }
    })
  },
  $delete (ajaxurl, callback, callerr) {
    let self = this
    Vue.http.delete(ajaxurl).then((response)=> {
      // response.data = Immutable.Map(response.data);
      callback(response.data)
    }, (response)=> {
      if (callerr) {
        callerr(response)
      } else {
        self.ajaxerr(response)
      }
    })
  },
  // ajax错误处理
  ajaxerr (response) {
    // 此处需配合后端进行自定义的错误设置
    // console.log(response)
    switch (response.status) {
      case 0: // 网络不通
        this.toast('warning', '网络暂时未能连通')
        break
      case 401: // 未登录
      case 521: // 超时
      case 522: // 错误
        this.init()
        break
      case 523:
        this.toast('danger', '当前时间存在较大偏差')
        break
      case 524:
        this.toast('danger', '未找到相关数据')
        break
      default:
        // 其它错误，暂不处理
        break
    }
  },
  timestamp () {
    return Math.floor(new Date().getTime() / 1000)
  }
}