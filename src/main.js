import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import lang from './assets/lang'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueI18n)

// I18n
const i18n = new VueI18n({
  messages: lang, // set locale messages
  locale: (navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language), // set locale
  fallbackLocale: 'fr',
  availableLocales: ['en', 'fr'],
  silentFallbackWarn: true
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
