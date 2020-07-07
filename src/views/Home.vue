<template>
  <div class="home">
    <h1>Введите URL</h1>
    <input placeholder="Enter URL" @keyup="keyup" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    keyup() {
      console.log("up");
    }
  },
  components: {}
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
</style>
