import Vue from 'vue'

import router from './router'
import store  from './store'
import Root   from './v-root'
import '/infra/style/vue-material-adapter'

Vue.config.productionTip = true;

new Vue({
   router,
   store,
   render: h => h(Root)
}).$mount('#app');
