<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{login}}</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: this.$route.params["login"] ?? "Логин не определен"
    };
  },
  watch: {
    $route(to) {
      this.login = to.params["login"];
    }
  }
};
</script>

<style scoped>
</style>