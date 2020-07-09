<template>
  <div class="home">
    <h1 class="app__fullWidth">Введите имя пользователя Git</h1>
    <div class="app__fullWidth home__header">
      <v-text-field
        v-model="users"
        :rules="nameRules"
        :counter="12"
        label="Имя в Git"
        required
        class="home__users"
        @keyup.self="debouce(keyup)"
      ></v-text-field>
      <v-pagination v-model="page" :total-visible="7" :length="length"></v-pagination>
      <v-text-field
        v-model="visible"
        label="Количество"
        max="70"
        min="1"
        step="1"
        type="number"
        @keyup.self="debouce(keyup)"
      ></v-text-field>
    </div>
    <router-link tag="div" :to="'/about/'+item.login"
      v-for="item in searchUsers.items"
      :key="item.id"
      class="home__users"
    >
      <h2>{{item.login}}</h2>
      <img :src="item.avatar_url" width="200px" />
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
      totalVisible: "",
      visible: "20",
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
    },
    length() {
      return Math.ceil(this.searchUsers.total_count / this.visible);
    }
  },
  methods: {
    keyup() {
      console.log(" users", this.searchUsers);
      this.$store.dispatch("search", {
        visible: this.visible,
        users: this.users
      });
    },
    debouce(fun) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(fun, 700);
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
  padding: 50px 20px 20px 20px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: 1fr, auto;
  grid-gap: 20px;
  justify-items: center;
  align-content: flex-start;
  text-align: center;
}
.home__header {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.home__users {
  flex: 1 1 50%;
  margin-right: auto;
}
</style>
