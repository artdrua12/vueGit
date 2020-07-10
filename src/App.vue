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
        <v-tabs>
          <v-tab to="/">Home</v-tab>
          <v-tab v-for="(item,i) in tabs" :to="item.href" :key="item.name">
            {{item.name}}
            <v-btn icon color="deep-orange" @click="deleteTab(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    deleteTab(i) {
      this.$store.commit("deleteTabs", i);
      this.$router.go(-1);
    }
  },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    }
  }
};
</script>
<style>
.app__fullWidth {
  grid-column: -1/1;
}
</style>
