<template>
  <div class="home">
    <h1 class="app__fullWidth">Введите имя пользователя Git</h1>
    <div class="app__fullWidth home__header">
      >
      <v-text-field
        v-model="users"
        :rules="nameRules"
        :counter="12"
        label="Имя в Git"
        required
        @keyup="keyup"
      ></v-text-field>
      <v-pagination v-model="page" :length="7"></v-pagination>
    </div>
    <div v-for="item in searchUsers.items" :key="item.id" class="home__users">
      <h2>{{item.login}}</h2>
      <img :src="item.avatar_url" width="200px" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
      page: 0,
      nameRules: [
        v => !!v || "Необходимо ввести имя",
        v => v.length <= 12 || "Имя должно быть не более 12 символов"
      ],
      timeout: null
    };
  },
  computed: {
    searchUsers() {
      return this.$store.state.searchUsers;
    }
  },
  methods: {
    keyup() {
      console.log(" users", this.searchUsers);
      this.$store.dispatch("search", this.users);
    },
    debouce(fn) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(fn, 500);
    }
  },
  components: {}
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  min-height: 100%;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: 1fr, auto;
  grid-gap: 20px;
  justify-items: center;
  align-content: flex-start;
  text-align: center;
}
.home__header {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
h1 {
  margin-top: 32px;
}
</style>
