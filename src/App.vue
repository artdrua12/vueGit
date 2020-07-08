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
          <v-tab to="/about">About</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style>
.app__fullWidth{
  grid-column: -1/1;
}
</style>
