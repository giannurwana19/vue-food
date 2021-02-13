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

    <!-- checkout -->
    <div class="row mt-3 justify-content-end">
      <div class="col-lg-4 col-md-6">
        <form @submit.prevent="handleCheckout">
          <div class="form-group">
            <label for="">Nama Pemesan :</label>
            <input type="text" v-model="order.name" class="form-control" />
          </div>

          <div class="form-group">
            <label for="">Nomor Meja :</label>
            <input type="text" v-model="order.noTable" class="form-control" />
          </div>

          <button type="submit" class="btn btn-success float-right">
            <b-icon-cart></b-icon-cart> Checkout
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
  components: { Breadcrumb },
  data() {
    return {
      carts: [],
      order: {},
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

    handleCheckout() {
      if (!this.order.cart) {
        this.$toast.error('Keranjang Makanan Anda Kosong!', {
          position: 'top-right',
          dismissible: true,
        });
      } else {
        if (this.order.name && this.order.noTable) {
          this.order.carts = this.carts;

          axios
            .post('http://localhost:3005/orders', this.order)
            .then(() => {
              this.carts.map(async cart => {
                try {
                  return await axios.delete(
                    `http://localhost:3005/carts/${cart.id}`
                  );
                } catch (error) {
                  console.log(error);
                }
              });

              this.$router.push({ name: 'order.completed' });
              this.$toast.success('Sukses dipesan!', {
                position: 'top-right',
                dismissible: true,
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$toast.error('Nama pemesan dan Nomor meja wajib diisi!', {
            position: 'top-right',
            dismissible: true,
          });
        }
      }
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
