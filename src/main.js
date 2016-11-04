import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { getCookie } from './assets/js/cookie'
//use
Vue.use(vueRouter)

//根组件
const app = Vue.extend(require('./app.vue'))

//路由置顶，配置当 v-link 元素匹配的路径时需要添加到元素上的 class 。
const router = new vueRouter({
    linkActiveClass: 'active'
})

// 定义路由规则
router.map(routes)

//路由器会创建一个 app 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app, '#app')

//为路由器定义全局的重定向规则。
router.redirect({
    //重定向任意未匹配路径到index
    '*': '/index'
})

// 添加一个全局的后置钩子函数，该函数会在每次路由切换成功进入激活阶段时被调用。
router.afterEach(function(transition) {
   if (getCookie('zhangRongliangToken') == 'false') {
       router.go('/index')
   }
})