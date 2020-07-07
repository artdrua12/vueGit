import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchUsers: ""
  },
  mutations: {
    changeSearchUsers(state, payload) {
      state.searchUsers = payload;
    }
  },
  actions: {
    async search(context, user) {
      const response = await fetch(
        `https://api.github.com/users/${user}`
      );
      const res = await response.json();
      context.commit('changeSearchUsers', res);
    }
  },
  modules: {
  }
})
