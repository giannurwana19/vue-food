import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Food from '../views/Food.vue';
import FoodDetail from '../views/FoodDetail.vue';
import Cart from '../views/Cart.vue';
import OrderCompleted from '../views/OrderCompleted.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/foods',
    name: 'foods',
    component: Food,
  },
  {
    path: '/foods/:id',
    name: 'foods.detail',
    component: FoodDetail,
  },
  {
    path: '/carts',
    name: 'carts',
    component: Cart,
  },
  {
    path: '/order-completed',
    name: 'order.completed',
    component: OrderCompleted,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
