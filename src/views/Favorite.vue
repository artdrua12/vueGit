<template>
  <div class="favorite app__main">
    <v-card>
      <v-card-title>
        Избранные Forks
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="favorites" :search="search">
        <template v-slot:no-data>
          <v-btn color="primary">Reset, No data</v-btn>
        </template>
        <template v-slot:item.stargazers_count="{ item }">
          <v-rating
            v-model="item.stargazers_count"
            background-color="green lighten-3"
            color="green lighten-7"
            readonly
          ></v-rating>
        </template>
        <template v-slot:item.deleteFork="{ item }">
          <v-btn @click="deleteFavorite(item)" tile outlined color="success">
            <v-icon left color="red">mdi-delete</v-icon>Удалить из избранного
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "Владелец", value: "owner.login" },
        { text: "Название", value: "name" },
        { text: "Полное имя", value: "full_name" },
        { text: "Рейтинг", value: "stargazers_count" },
        { text: "Ссылка на репозиторий", value: "url" },
        { text: "Удалить Fork", value: "deleteFork" }
      ],

      search: "",
      loading: false
    };
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    }
  },
  methods: {
    deleteFavorite(item) {
      // this.$store.commit("deleteFavorite", item);
       this.$store.dispatch("deleteFavorite", item);
    }
  }
};
</script>

<style scoped>
</style>