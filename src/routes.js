import index from './components/index'
import ok from './components/ok'

/**
 * 设置路由
 * @param  {[router]}vue-router路由器实例
 * @param  {[app]}app.vue根组件
 */
export default {
  //异步路由
  '/index': {
    name: 'index',
    component: (resolve) => {
      require(['./components/index'], resolve)
    }
  },
  '/ok': {
    name: 'ok',
    component: (resolve) => {
      require(['./components/ok'], resolve)
    }
  }


}
