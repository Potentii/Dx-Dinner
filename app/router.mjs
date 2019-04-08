import Vue from 'vue'
import VueRouter from 'vue-router'

// *Getting the app's sections:
import AppSection from './v-app-section'

// *Getting the app's pages:
import HomePage     from './v-home-page'
import NewOrderPage from './order/v-new-order-page'



// *Registering vue-router:
Vue.use(VueRouter);

// *Building the router:
const router = new VueRouter({
   mode: 'history',

   routes: [
      {
         path: '/',
         component: AppSection,
         children: [
            { name: 'home-page', path: '', component: HomePage },
            { name: 'new-order-page', path: '/orders/new', component: NewOrderPage }
         ]
      }
   ]
});



export default router;
