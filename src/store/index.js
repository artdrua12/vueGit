import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchUsers: "",
    repositories: {},
    tabs: [],
    tab: 0,
    fork: [],
    snackbar: false,
    snackbarObj: {},
    favorites: []
  },
  mutations: {
    set(state, obj) {
      state[obj.name] = obj.value;
    },
    setTabs(state, obj) {
      const dublicate = state.tabs.findIndex(item => item.login == obj.login);
      if (dublicate == -1) {
        state.tabs.push(obj);
        Vue.set(state, 'tab', state.tabs.length)
      } else {
        Vue.set(state, 'tab', dublicate + 1);
      }
    },
    setRepositories(state, obj) {
      Vue.set(state.repositories, obj.name, obj.value)
    },
    setTab(state, value) {
      Vue.set(state, 'tab', value)
    },
    deleteTabs(state, i) {
      state.tabs.splice(i, 1);
    },
    addFavorite(state, obj) {
      const dublicate = state.favorites.findIndex(item => item.id == obj.id);
      if (dublicate == -1) {
        state.favorites.push(obj);
        state.snackbarObj = { color: 'success', text: 'Добавлено в избранное' }
      } else {
        state.snackbarObj = { color: 'info', text: 'Fork уже добавлен' }
      }
      state.snackbar = true
    },
    setSnackbar(state, obj) {
      state.snackbarObj = obj;
      state.snackbar = true;
    }
  },
  actions: {
    async search(context, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}&page=${obj.page}`
        );
        const res = await response.json();
        context.commit('set', { name: 'searchUsers', value: res });
      } catch (e) {
        context.commit("setSnackbar", {
          color: "error",
          text: "Ошибка запроса"
        });
      }
    },
    async searchRepositories(context, user) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
        const res = await response.json();
        context.commit('setRepositories', { name: 'repositories', value: res });
      } catch (e) {
        context.commit("setSnackbar", {
          color: "error",
          text: "Ошибка запроса"
        });
      }
    },
    async createFork(context, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${obj.owner.login}/${obj.name}/forks`
        );
        const res = await response.json();
        context.commit('set', { name: 'forks', value: res });
      } catch (e) {
        context.commit("setSnackbar", {
          color: "error",
          text: "Ошибка запроса"
        });
      }
    }
  },
  modules: {
  }
})
