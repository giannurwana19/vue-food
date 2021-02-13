<template>
  <div class="food-detail">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'home' }">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'foods' }">Foods</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Food Order
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-md-6">
        <img
          :src="'../assets/images/' + product.image"
          :alt="product.name"
          class="shadow"
          width="100%"
        />
      </div>
      <div class="col-md-6">
        <h3>{{ product.name }}</h3>
        <hr />
        <p>
          Harga : <strong>Rp. {{ product.price }}</strong>
        </p>

        <form>
          <div class="form-group">
            <label for="">Jumlah Pesan :</label>
            <input type="number" class="form-control" />
          </div>

          <div class="form-group">
            <label for="">Keterangan :</label>
            <textarea id="" cols="30" rows="3" class="form-control"></textarea>
          </div>

          <button type="submit" class="btn btn-success">
            <b-icon-cart></b-icon-cart> Pesan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      product: {},
    };
  },

  methods: {
    async getDetailProducts() {
      try {
        const { data } = await axios.get(
          `http://localhost:3005/products/${this.$route.params.id}`
        );
        this.product = data;
      } catch (error) {
        console.log(error.response);
      }
    },
  },

  mounted() {
    this.getDetailProducts();
  },
};
</script>

<style scoped>
.breadcrumb-item.active {
  font-weight: 700;
}

img {
  border-radius: 20px;
}
</style>
