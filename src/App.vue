<template>
  <div id="app">
    <Navbar />
    <div class="container mt-4">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style></style>
