<template>
  <div class="card">
    <img :src="'assets/images/' + product.image" :alt="product.name" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Rp. {{ product.price }}</p>
      <router-link
        :to="{ name: 'foods.detail', params: { id: product.id } }"
        class="btn btn-success"
      >
        Pesan
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.card {
  transition: 0.3s;
}

.card:hover {
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.5);
}
</style>
