import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'

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
    setFavorite(state, obj) {
      state.favorites.push(obj);
      state.snackbarObj = { color: 'success', text: 'Добавлено в избранное' };
      state.snackbar = true;
    },
    deleteFavorite(state, obj) {
      const i = state.favorites.findIndex(item => item.id == obj.id);
      Vue.delete(state.favorites, i);
    },
    setSnackbar(state, obj) {
      state.snackbarObj = obj;
      state.snackbar = true;
    }
  },
  actions: {
    async search({ commit }, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}&page=${obj.page}`
        );
        const res = await response.json();
        commit('set', { name: 'searchUsers', value: res });
      } catch (e) {
        commit("setSnackbar", { color: 'error', text: 'Ошибка запроса' });
      }
    },

    async searchRepositories({ commit }, user) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
        const res = await response.json();
        commit('setRepositories', { name: 'repositories', value: res });
      } catch (e) {
        commit("setSnackbar", { color: 'error', text: 'Ошибка запроса' });
      }
    },

    async getFork({ commit }, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${obj.owner.login}/${obj.name}/forks`
        );
        const res = await response.json();
        commit('set', { name: 'forks', value: res });
      } catch (e) {
        commit('setSnackbar', { color: 'error', text: 'Ошибка запроса' });
      }
    },

    async addFavorites({ commit, state }, obj) {
      const dublicate = state.favorites.findIndex(item => item.id == obj.id);
      if (dublicate == -1) {
        commit('setFavorite', obj);
        try {
          await fb.database().ref('forks').push(obj);
        } catch (e) {
          commit("setSnackbar", { color: 'error', text: 'Ошибка записи в FireBase' });
        }
      } else {
        commit("setSnackbar", { color: 'info', text: 'Fork уже добавлен' });
      }
    },
    async getFireBase({ commit, state }) {
      let forksData = null;
      try {
        const fbData = await fb.database().ref('forks').once('value')
        forksData = fbData.val();
        console.log('forksData', forksData);
      } catch{
        commit("setSnackbar", { color: 'info', text: 'Ошибка чтения из FireBase' });
      }
      if (forksData == null) return

      Object.keys(forksData).forEach(key => {
        const item = forksData[key];
        state.favorites.push(item);
      })
      console.log(state.favorites);
    }
  }
})
