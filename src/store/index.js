import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchUsers: "",
  },
  mutations: {
    changeSearchUsers(state, payload) {
      state.searchUsers = payload;
    }
  },
  actions: {
    async search(context, obj) {
      const response = await fetch(
        `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}`
      );
      const res = await response.json();
      context.commit('changeSearchUsers', res);
    }
  },
  modules: {
  }
})
