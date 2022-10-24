
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from '../config/store'
import router from '../config/router'
import vuetify from './plugins/vuetify'
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'

Vue.config.productionTip = false

Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
    valueAsInteger: false,
    allowNegative: true
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
