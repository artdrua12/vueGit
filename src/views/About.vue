<template>
  <div class="about app__main">
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
          <v-btn @click="createFork(item)" :disabled="item.forks==0" tile outlined color="success">
            <v-icon left>mdi-widgets</v-icon>Fork
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      repositories: [],
      url: "",
      headers: [
        { text: "name Rep", value: "name" },
        { text: "Полное имя", value: "full_name" },
        { text: "Forks", value: "forks" },
        { text: "Ссылка на репозиторий", value: "url" },
        { text: "Получить Fork", value: "fork" }
      ],
      search: ""
    };
  },
  methods: {
    async createFork(item) {
      await this.$store.dispatch("createFork", item);
      console.log("item", item);
    }
  },
  mounted() {
    this.repositories = this.$store.state.repositories.repositories;
  }
};
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;

  text-align: center;
  align-items: center;
}
</style>