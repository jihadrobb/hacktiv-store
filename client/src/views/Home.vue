<template>
  <div class="home">
    <div class="row d-flex justify-content-center">
      <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Home',
  components: {
    ProductCard,
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ path: '/login' });
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>
