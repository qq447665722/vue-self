

<template lang="html">

<p>
    这里是index页面，可作为login页面
</p>
<top-nav>
</top-nav>
<h1>这里是index页面</h1>

</template>
<script>
    import Vue from 'vue'
    import topNav from './top-nav'
    Vue.component('top-nav', topNav)

</script>