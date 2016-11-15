<template lang="html">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex' // import 我们刚刚创建的 store
export default {
    store
};
</script>
