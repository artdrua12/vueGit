<template>
  <div class="home">
    <h1>Введите URL</h1>
    <input v-model="users" placeholder="Enter URL" @keyup="keyup" />
    <div v-for="item in searchUsers.items" :key="item.id" >
      <h2>{{item.login}}</h2>
    <img :src="item.avatar_url" width="200px">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
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
