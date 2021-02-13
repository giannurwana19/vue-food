<template>
  <div class="carts">
    <div class="row">
      <div class="col">
        <Breadcrumb name="Keranjang" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h2>Keranjang <strong>Saya</strong></h2>
        <div class="table-responsive mt-3">
          <table class="table table-hover table-bordered">
            <thead>
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Ketarangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga (porsi)</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="cart.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <img
                    :src="'../assets/images/' + cart.product.image"
                    width="180"
                    alt="cart"
                  />
                </td>
                <td>{{ cart.product.name }}</td>
                <td>{{ cart.description ? cart.description : '-' }}</td>
                <td>{{ cart.totalOrder }}</td>
                <td>Rp. {{ cart.product.price }}</td>
                <td>
                  <strong
                    >Rp. {{ cart.product.price * cart.totalOrder }}
                  </strong>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteCart(cart.id)"
                  >
                    <b-icon-trash></b-icon-trash>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6" class="text-right"><strong>Total :</strong></td>
                <td colspan="2">
                  <strong>Rp. {{ total }}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb.vue';
export default {
  components: { Breadcrumb },
  data() {
    return {
      carts: [],
    };
  },

  methods: {
    async getCarts() {
      try {
        const { data } = await axios.get('http://localhost:3005/carts');
        this.carts = data;
      } catch (error) {
        console.log(error);
      }
    },

    deleteCart(id) {
      axios
        .delete(`http://localhost:3005/carts/${id}`)
        .then(() => {
          this.$toast.success('Sukses menghapus keranjang!', {
            position: 'top-right',
            dismissible: true,
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  computed: {
    total() {
      return this.carts.reduce(function(item, data) {
        return item + data.product.price * data.totalOrder;
      }, 0);
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

<style scoped>
img {
  border-radius: 20px;
}
</style>
