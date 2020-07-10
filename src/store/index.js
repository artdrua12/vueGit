import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchUsers: "",
    about: '/about/пользователь_не_выбран',
    tabs: []
  },
  mutations: {
    set(state, obj) {
      state[obj.name] = obj.value;
    },
    setTabs(state, name) {
      state.tabs.push({ href: `/about/${name}`, name: name })
    },
    deleteTabs(state, i) {
      state.tabs.splice(i,1);
    }
  },
  actions: {
    async search(context, obj) {
      const response = await fetch(
        `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}&page=${obj.page}`
      );
      const res = await response.json();
      context.commit('set', { name: 'searchUsers', value: res });
    }
  },
  modules: {
  }
})
