import Vue from 'Vue'
import vueResource from 'vue-resource'
import service from './service'

Vue.use(vueResource)
Vue.http.options.emulateJSON = true
resourceSet(Vue)


export default {
  // cache 机制
  cache: [],
  // 默认300秒数据缓存时间
  exp: 300,
  getCache (url) {
    let json = this.cache[url]
    return (json && (json.exp >= this.timestamp())) ? json.data : null
  },
  setCache (url, data, exp) {
    // 默认300秒,{data,exp}
    this.cache[url] = {data: data, exp: this.timestamp() + ((!exp) ? this.exp : exp)}
    // console.log(this.cache)
  },
  $resource(model, method, callback, callerr){
    let url = service.base + '/' + model
    let param
    if (method.isArray()) {
      key    = Object.keys(method).shift();
      param  = method[key]
      method = key
    }
    switch (method) {
      case 'post':
        Vue.http.post(url, param, {
          headers: {
            // 加入授权验证算法
            'Authorization': 'test'
          }
        }).then(function (response) {
          callback(_self, response.data)
        }, function (response) {
          this.ajaxerr(response)
        })
        break
      case 'put':
        Vue.http.put(url, param, {
          headers: {
            // 加入授权验证算法
            'Authorization': 'test'
          }
        }).then(function (response) {
          callback(_self, response.data)
        }, function (response) {
          this.ajaxerr(response)
        })
        break
      case 'delete':
        Vue.http.delete(url, {
          headers: {
            // 加入授权验证算法
            'Authorization': 'test'
          }
        }).then(function (response) {
          callback(_self, response.data)
        }, function (response) {
          this.ajaxerr(response)
        })
        break
      default:
        let data = this.getCache(url)
        if (!data) {
          Vue.http.get(url, {}, {}).then((response) => {
            // response.data = Immutable.Map(response.data);
            callback(response.data, true)
            if (!(exp && exp < 0)) this.setCache(url, response.data, exp)
          }, (response) => {
            this.ajaxerr(response)
          })
        } else {
          callback(data, false)
        }
    }
  },
  $get(ajaxurl, callback, callerr, exp) {
    // callback _self:this,data,ajax
    let url  = ajaxurl
    let data = this.getCache(url)
    if (!data) {
      Vue.http.get(url, {}, {}).then((response) => {
        // response.data = Immutable.Map(response.data);
        callback(response.data, true)
        if (!(exp && exp < 0)) this.setCache(url, response.data, exp)
      }, (response) => {
        this.ajaxerr(response)
      })
    } else {
      callback(data, false)
    }
  },
  // post带鉴权，不使用缓存
  $post (ajaxurl, param, callback, _self, exp) {
    let url = this.ajaxhost + ajaxurl
    Vue.http.post(url, param, {
      headers: {
        // 加入授权验证算法
        'Authorization': 'test'
      }
    }).then(function (response) {
      // response.data = Immutable.Map(response.data);
      callback(_self, response.data)
    }, function (response) {
      this.ajaxerr(response)
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

function resourceSet(Vue) {

  Vue.http.interceptors.push((request, next) => {

    request.headers.token = 'set token msg';

    next((response) => {
      switch (response.status) {
        case "500":
          alert('操作失败：500')
          break;
        case "404":
          alert('操作失败：404')
          break;
      }
    });

  })

}