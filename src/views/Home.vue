<template>
  <div class="home">
    <h1>Введите URL</h1>
    <input v-model="users" placeholder="Enter URL" @keyup="keyup" />
    <div>{{searchUsers}}</div>
    <img :src="searchUsers.avatar_url" width="200px">
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: ""
    };
  },
  computed: {
    searchUsers(){
      return this.$store.state.searchUsers
    }
  },
  methods: {
    keyup() {
      console.log(" users", this.searchUsers);
      this.$store.dispatch("search",this.users);
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
