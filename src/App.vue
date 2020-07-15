<template>
  <v-app>
    <v-app-bar
      :collapse="!collapseOnScroll"
      app
      color="primary"
      dark
      shrink-on-scroll
      prominent
      src="@/assets/flower.jpg"
      fade-img-on-scroll
    >
      <v-toolbar-title>Навигация</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link active-class="active" exact to="/">
        <v-btn icon @click="toHome">
          <v-icon large>mdi-magnify</v-icon>
        </v-btn>
      </router-link>

      <router-link active-class="active" exact to="favorite">
        <v-btn icon @click="toHome">
          <v-icon large>mdi-heart</v-icon>
        </v-btn>
      </router-link>

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

      <v-snackbar v-model="snackbar" :color="snackbarObj.color" :timeout="3000" right="right">
        {{snackbarObj.text}}
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import About from "@/views/About.vue";
export default {
  name: "App",
  data() {
    return {
      collapseOnScroll: true
    };
  },
  methods: {
    deleteTab(i) {
      this.$store.commit("deleteTabs", i);
    },
    toHome() {
      this.$store.commit("setTab", 0);
    }
  },
  mounted(){
    this.$store.dispatch("getFireBase");
  },
  computed: {
    tabs() {
      return this.$store.state.tabs;
    },
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.$store.commit("set", { name: "snackbar", value });
      }
    },
    snackbarObj() {
      return this.$store.state.snackbarObj;
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
  max-width: 1500px;
  min-height: 100%;
  margin: auto;
  padding: 50px 20px 20px 20px;
}
a {
  text-decoration: none;
}
.active {
  border-bottom: 2px solid yellow;
}
</style>
