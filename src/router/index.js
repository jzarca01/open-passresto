import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login';

import SodexoCard from '@/components/SodexoCard.vue';
import TransactionsList from '@/components/TransactionsList.vue';
import RangeSelector from '@/components/RangeSelector.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "Login" },
    },
    {
      path: "/login",
      component: Login,
      name: "Login"
    },
    {
      path: "/Dashboard",
      meta: { auth: true },
      component: Dashboard,
      name: "Dashboard",
      children: [
        {
          path: "transactions",
          name: "Transactions",
          component: TransactionsList,
          props: true
        },
        {
          path:"card",
          name:"Card",
          component: SodexoCard,
          props: true
        },
        {
          path:"range",
          name:"Range",
          component: RangeSelector,
          props: true
        }
      ],
    }
    /*{
      path: "/authenticated",
      meta: { auth: true },
      redirect: { to: "Home" },
      component: Authenticated,
      children: [
        {
          path: "home",
          name: "Home",
          component: Home,
        },
      ],
    },*/
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth) && !store.state.isAuthentified) {
    next({ name: "Login" });
  } else {
    next();
  }
})

export default router;