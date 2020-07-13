<template>
  <div class="home app__main">
    <h1 class="app__fullWidth">Введите имя пользователя Git</h1>
    <div class="app__fullWidth home__header">
      <v-text-field
        v-model="users"
        :rules="nameRules"
        :counter="12"
        label="Имя в Git"
        required
        class="home__users"
        placeholder="Начните вводить имя, данные подгрузятся авноматически"
        @keyup.self="keyup"
      ></v-text-field>
      <v-pagination v-model="page" :total-visible="7" :length="length" @input="search"></v-pagination>
      <v-select
        :items="items"
        v-model="visible"
        @change="keyup"
        label="Количество"
        class="home__select"
      ></v-select>
    </div>
    <div class="app__fullWidth home__progress">
      <v-progress-circular
        v-if="loading"
        indeterminate
        :size="200"
        :width="15"
        color="yellow"
      ></v-progress-circular>
    </div>
    <div v-for="item in searchUsers.items" :key="item.id" class="home__users">
      <h2>{{item.login}}</h2>
      <img :src="item.avatar_url" @click="addTabs(item.login,item.avatar_url)" width="200px" />
    </div>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: "",
      totalVisible: "",
      visible: 20,
      items: [10, 20, 30, 40, 50],
      page: 0,
      loading: false,
      dialog: false,
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
      let count = this.searchUsers.total_count;
      if (count > 1000) {
        count = 1000;
      }
      return Math.ceil(count / this.visible) || 0;
    }
  },
  methods: {
    keyup() {
      this.page = 0;
      this.debouce(this.search);
    },
    async search() {
      try {
        this.loading = true;
        await this.$store.dispatch("search", {
          visible: this.visible,
          users: this.users,
          page: this.page
        });
      } finally {
        this.loading = false;
      }
      console.log("user", this.searchUsers);
    },
    debouce(fun) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(fun, 500);
    },
    async addTabs(login, avatar) {
      this.dialog = true;
      await this.$store.dispatch("searchRepositories", login);
      this.$store.commit("setTabs", { login, avatar });
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.home {
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
  flex: 4 1 400px;
  margin-right: auto;
}
.home__select {
  flex: 1 0 40px;
}

</style>
