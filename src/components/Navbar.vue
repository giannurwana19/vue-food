<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">G-Food</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'foods' }">
              Food
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{name: 'carts'}">
              Keranjang
              <b-icon-bag></b-icon-bag>
              <span class="badge badge-success ml-2">
                {{ totalOrder.length }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
