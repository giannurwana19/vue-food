<template>
  <div class="food">
    <div class="row">
      <div class="col-md">
        <h2>Daftar <strong>Makanan</strong></h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <input
            v-model="keyword"
            @keyup="searchFood"
            type="text"
            class="form-control"
            placeholder="Cari Makanan kesukaan anda..."
          />
          <div class="input-group-prepend">
            <span class="btn btn-success">
              <b-icon-search></b-icon-search>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4 mt-3" v-for="product in products" :key="product.id">
        <CardProduct :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CardProduct from '../components/CardProduct.vue';
export default {
  components: {
    CardProduct,
  },
  data() {
    return {
      products: [],
      keyword: '',
    };
  },
  methods: {
    async setProducts() {
      try {
        const { data } = await axios.get(`http://localhost:3005/products`);
        this.products = data;
      } catch (error) {
        console.log(error.response.data);
      }
    },

    async searchFood() {
      try {
        const { data } = await axios.get(
          `http://localhost:3005/products?q=${this.keyword}`
        );
        this.products = data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  mounted() {
    this.setProducts();
  },
};
</script>

<style></style>
