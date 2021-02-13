<template>
  <div class="food-detail">
    <div class="row">
      <div class="col">
        <Breadcrumb name="Food Order" />
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

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="">Jumlah Pesan (porsi) :</label>
            <input
              type="number"
              v-model="order.totalOrder"
              class="form-control"
              placeholder="0"
            />
          </div>

          <div class="form-group">
            <label for="">Keterangan :</label>
            <textarea
              id=""
              v-model="order.description"
              cols="30"
              rows="3"
              class="form-control"
              placeholder="Keterangan spt: Pedes, Nasi Setengah..."
            ></textarea>
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
import Breadcrumb from '../components/Breadcrumb.vue';
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      product: {},
      order: {},
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

    handleSubmit() {
      if (this.order.totalOrder) {
        this.order.product = this.product;
        axios
          .post('http://localhost:3005/carts', this.order)
          .then(() => {
            this.$router.push({ name: 'carts' });
            this.$toast.success('Sukses Masuk keranjang!', {
              position: 'top-right',
              dismissible: true,
            });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$toast.error('Harap masukkan jumlah pesan!', {
          position: 'top-right',
          dismissible: true,
        });
      }
    },
  },

  mounted() {
    this.getDetailProducts();
  },
};
</script>

<style scoped>
img {
  border-radius: 20px;
}
</style>
