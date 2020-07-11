<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/flower.jpg"
      fade-img-on-scroll
    >
      <v-toolbar-title>Навигация</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab key="home">Home</v-tab>
          <v-tab v-for="(item,i) in tabs" :key="item.login">
            {{ item.login }}
            <v-btn icon color="red" @click="deleteTab(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-tabs-items v-model="tab">
        <v-tab-item key="home">
          <router-view></router-view>
        </v-tab-item>
        <v-tab-item v-for="item in tabs" :key="item.login">
          <about :obj="item" />
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import About from "@/views/About.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    deleteTab(i) {
      this.$store.commit("deleteTabs", i);
    }
  },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    },
    tab: {
      get() {
        return this.$store.state.tab;
      },
      set(value) {
        this.$store.commit("setTab", value);
      }
    }
  },
  components: {
    About
  }
};
</script>
<style>
.app__fullWidth {
  grid-column: -1/1;
}
.app__main {
  max-width: 1200px;
  min-height: 100%;
  margin: auto;
  padding: 50px 20px 20px 20px;
}
</style>
