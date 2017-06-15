// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueScroller from 'vue-scroller'

Vue.use(Vuex)
Vue.use(VueScroller)

Vue.filter('time', function (value) {
  return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
})

const store = new Vuex.Store({
  state: {
    username:'',
    token:'',
    server: 'http://127.0.0.1:3000',
    // count: 0,
    dragX: 480,
    dragY: 60
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
  }
})

// store.commit('increment')
// console.log(store.state.count)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
