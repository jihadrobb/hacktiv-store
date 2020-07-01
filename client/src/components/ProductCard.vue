<template>
    <div class="card m-3" style="width: 18rem;">
        <img class="card-img-top" :src="product.image_url" :alt="product.name">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ priceString(product) }}</p>
            <div class="input-group mb-3 d-flex justify-content-center">
                <button class="btn btn-secondary" @click="buyProduct">Buy</button>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted">Stock: {{ product.stock }}</small>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
      buyProduct() {
        swal.fire({
            title: this.product.name,
            text: this.priceString(this.product),
            imageUrl: this.product.image_url,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: this.product.name,
            input: 'text',
            inputValue: 1,
            confirmButtonText: 'Buy'
        })
        .then(({value}) => {
            this.$store.dispatch('createOrder', {
                quantity: Number(value),
                ProductId: Number(this.product.id)
            });
            this.$store.dispatch('fetchProducts');
        })
        .catch(err => console.log(err.errors))
      },
      priceString(product) {
        let price = String(product.price);
        price = price.split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
        return `Rp. ${price}`;
      }
  },
};
</script>
