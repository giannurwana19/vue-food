<template>
  <div class="home">
    <Hero />

    <div class="row mt-4">
      <div class="col">
        <h3>Best <strong>Foods</strong></h3>
      </div>
      <div class="col">
        <router-link to="/food" class="btn btn-success float-right">
          <b-icon-eye></b-icon-eye> Lihat Semua
        </router-link>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CardProduct from '../components/CardProduct.vue';
import Hero from '../components/Hero.vue';
export default {
  components: {
    Hero,
    CardProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async setProducts() {
      try {
        const { data } = await axios.get('http://localhost:3005/bestProdutcs');
        this.products = data;
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
  mounted() {
    this.setProducts();
  },
};
</script>

<style></style>
