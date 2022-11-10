
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import vuetify from './plugins/vuetify'
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'
import './config/msg.js'
Vue.config.productionTip = false

Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, {
  "locale": "pt-BR",
  "currency": "BRL",
  "currencyDisplay": "symbol",
  "precision": {
    "min": 2,
    "max": 2
  },
  "hideCurrencySymbolOnFocus": true,
  "hideGroupingSeparatorOnFocus": true,
  "hideNegligibleDecimalDigitsOnFocus": true,
  "autoDecimalDigits": false,
  "useGrouping": true,
  "accountingSign": false
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
