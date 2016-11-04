<template lang="html">

<div class="container-fluid">
    <!-- 路由外链 -->
    <router-view></router-view>
</div>

</template>

<script>

import store from './vuex/store' // import 我们刚刚创建的 store

import {
    getCookie,
    setCookie
}
from './assets/js/cookie'

export default {
    events: {
        setToken: function(token) {
            setCookie('zhangRongliangToken', token)
        }
    },
    store
};

</script>
