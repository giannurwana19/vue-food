<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'foods' }">Foods</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <strong>{{ name }}</strong>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Home',
    },
  },
};
</script>

<style></style>
