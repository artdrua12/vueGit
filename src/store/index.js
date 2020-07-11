import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchUsers: "",
    repositories: {},
    tabs: [],
    tab: 0
  },
  mutations: {
    set(state, obj) {
      state[obj.name] = obj.value;
    },
    setTabs(state, obj) {
      const dublicate = state.tabs.findIndex(item => item.login == obj.login);
      if (dublicate != -1) return
      state.tabs.push(obj);
    },
    setRepositories(state, obj) {
      Vue.set(state.repositories, obj.name, obj.value)
    },
    setTab(state,value) {
      Vue.set(state, 'tab', value)
      console.log('d',value);
      
    },
    deleteTabs(state, i) {
      state.tabs.splice(i, 1);
    }
  },
  actions: {
    async search(context, obj) {
      const response = await fetch(
        `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}&page=${obj.page}`
      );
      const res = await response.json();
      context.commit('set', { name: 'searchUsers', value: res });
    },
    async searchRepositories(context, user) {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const res = await response.json();
      context.commit('setRepositories', { name: 'repositories', value: res });
    }
  },
  modules: {
  }
})
