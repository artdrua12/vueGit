import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    fb.initializeApp(
      {
        apiKey: "AIzaSyCARgEkqUEZS9WRj6erk_TvLi11sH16PK0",
        authDomain: "github-2c25a.firebaseapp.com",
        databaseURL: "https://github-2c25a.firebaseio.com",
        projectId: "github-2c25a",
        storageBucket: "github-2c25a.appspot.com",
        messagingSenderId: "570162839667",
        appId: "1:570162839667:web:9076a6611326030c4dea06"
      }
    )
  },
}).$mount('#app')
