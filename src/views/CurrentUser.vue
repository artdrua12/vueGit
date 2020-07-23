<template>
  <div class="user app__main">
    <img :src="obj.avatar" width="150px" />
    <h1>{{obj.login}}</h1>
    <!-- <h3 v-for="item in repositories" :key="item.name">{{item.name}}</h3> -->
    <v-card class="app__fullWidth">
      <v-card-title>
        Репозитории
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="repositories" :search="search">
        <template v-slot:no-data>
          <v-btn color="primary">Reset, No data</v-btn>
        </template>
        <template v-slot:item.fork="{ item }">
          <v-btn
            @click.stop="getFork(item)"
            :disabled="item.forks==0"
            tile
            outlined
            color="success"
            :loading="loading"
          >
            <v-icon left>mdi-widgets</v-icon>Fork
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="1200">
      <v-card>
        <v-card-title class="headline">Forks</v-card-title>
        <v-data-table :headers="headersFork" :items="forks" :search="search">
          <template v-slot:item.stargazers_count="{ item }">
            <v-rating
              v-model="item.stargazers_count"
              background-color="green lighten-3"
              color="green lighten-7"
              readonly
            ></v-rating>
          </template>
          <template v-slot:item.favorite="{item}">
            <v-btn tile outlined color="success" @click="addFaforite(item)" :disabled="loadFavor">
              <v-icon color="red" left>mdi-heart</v-icon>Add Faforite
            </v-btn>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object,
      default: function() {
        return {
          avatar: require("@/assets/flower.jpg"),
          login: "no_user"
        };
      }
    }
  },
  data() {
    return {
      repositories: [],
      forks: [],
      url: "",
      headers: [
        { text: "name Rep", value: "name" },
        { text: "Полное имя", value: "full_name" },
        { text: "Forks", value: "forks" },
        { text: "Ссылка на репозиторий", value: "url" },
        { text: "Отобразить Fork", value: "fork" }
      ],
      headersFork: [
        { text: "Id", value: "id" },
        { text: "Имя репозитория", value: "name" },
        { text: "Размер", value: "size" },
        { text: "Дата создания", value: "created_at" },
        { text: "Ветка по умолчанию", value: "default_branch" },
        { text: "Рейтинг", value: "stargazers_count" },
        { text: "Избранное", value: "favorite" }
      ],
      search: "",
      dialog: false,
      loading: false,
      loadFavor: false
    };
  },
  methods: {
    async getFork(item) {
      try {
        this.loading = true;
        await this.$store.dispatch("getFork", item);
        this.forks = await this.$store.state.forks;
        this.dialog = true;
        this.loading = false;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async addFaforite(item) {
      this.loadFavor = true;
      await this.$store.dispatch("addFavorites", item);
      this.loadFavor = false;
    }
  },
  mounted() {
    this.repositories = this.$store.state.repositories.repositories;
  }
};
</script>

<style scoped>
.user {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;

  text-align: center;
  align-items: center;
}
</style>