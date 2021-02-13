<template>
  <b-navbar toggleable="lg">
    <div class="container">
      <b-navbar-brand href="">G-Food</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'foods' }">
              Food
            </router-link>
          </li>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'carts' }">
              Keranjang
              <b-icon-bag></b-icon-bag>
              <span class="badge badge-success ml-2">
                {{ totalOrder.length }}
              </span>
            </router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      totalOrder: [],
    };
  },

  methods: {
    async getCarts() {
      try {
        const { data } = await axios.get('http://localhost:3005/carts');
        this.totalOrder = data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getCarts();
  },

  updated() {
    this.getCarts();
  },
};
</script>

<style></style>
