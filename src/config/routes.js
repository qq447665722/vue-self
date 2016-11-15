import index from '../components/index'

/**
 * 设置路由
 * @param  {[router]}vue-router路由器实例
 * @param  {[app]}app.vue根组件
 */
export default {
  //异步路由
  '/index': {
    name: 'index',
    component: index
  },
  '/ok': {
    name: 'ok',
    //按需加载组件
    component: (resolve) => {
      require(['../components/ok'], resolve)
    }
  }


}
