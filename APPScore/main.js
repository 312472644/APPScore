import Vue from 'vue'
import App from './App'
import store from './vuex'
import utils from './common/utils'

Vue.config.productionTip = false
Vue.prototype.utils = utils;
Vue.prototype.bus = utils.bus();

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
