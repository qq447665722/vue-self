<template lang="html">

  <p>
    登录状态判断成功，成功进入ok页面
  </p>
  <button type="button" class="btn btn-default" @click="goIndex">
    go(/index)
  </button>
  <p>
    Vuex
  </p>
  <button type="button" class="btn btn-default" @click='increment'>
    Increment + 1
  </button>
  <button type="button" class="btn btn-default" @click='reduce'>
    reduce - 1
  </button>
  <button type="button" class="btn btn-default" @click='aa'>
    getuserlist
  </button>
  <h3>方法1：</h3>
  <h3>Count is {{ counterValue }}</h3>
  <h3>Sumnub is {{ sumnubValue }}</h3>
  <h3>方法2：</h3>
  <h3>count：{{ count }}</h3>
  <h3>sumnub：{{ sumnub }}</h3>
  <h3>方法3:</h3>
  <h3>countTest:{{ countTest }}</h3>
  <h3>sumnubTest:{{ sumnubTest }}</h3>

</template>

<script type="text/babel">
  import { incrementCounter, reduceCounter, getUserList } from '../vuex/actions';
  // 方法1
  import { getCount, getSumnub } from '../vuex/getters';


  export default {
    computed: {
      //方法3
      countTest: state => state.count,
      sumnubTest: state => state.sumnub
    },
    vuex: {
      actions: {
        increment: incrementCounter,
        reduce: reduceCounter,
        aa: getUserList,
      },
      getters: {
        // 方法1：注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
        counterValue: getCount,
        sumnubValue: getSumnub,
        //方法2：该 getter 函数将会把仓库的 `store.state.count` 绑定为组件的 `this.count`
        count: state => state.count,
        sumnub: state => state.sumnub
      }
    },
    methods: {
      goIndex() {
        this.$router.go('/index')
      }
    }
  };

</script>
