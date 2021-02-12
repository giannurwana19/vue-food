<template>
  <footer class="mt-5">
    <hr>
    <div class="container my-3">
      <div class="row">
        <div class="col text-center">
          &copy;Copyright {{ year }} by <strong>G-Food</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    year(){
      return new Date().getFullYear();
    }
  }
}
</script>

<style>

</style>