import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPen, faTachometerAlt, faCoins, faEuroSign, faReceipt, faBalanceScale, faExchangeAlt, faThLarge, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faPen, faTachometerAlt, faCoins, faEuroSign, faReceipt, faBalanceScale, faExchangeAlt, faThLarge, faPlus)
Vue.component('fai', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')