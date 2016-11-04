<template lang="html">

  <div>
    <button class="btn btn-default" @click="okToken">
      Set Token
    </button>
    <button class="btn btn-default" @click="noToken">
      logout Token
    </button>
  </div>

</template>

<script>

  export default {
    methods: {
      okToken() {
        this.$dispatch("setToken", true)
        this.$router.go('/ok')
      },
      noToken() {
        this.$dispatch("setToken", false)
        this.$router.go('/ok')
      }
    }
  };

</script>
