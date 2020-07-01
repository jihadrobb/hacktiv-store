<template>
    <div>
        <h3>Your Cart</h3>
        <p>Total Price = {{ calculateTotalPrice }}</p>
        <button class="btn btn-warning" @click="checkout">Checkout</button>
        <div class="row d-flex justify-content-center">
            <OrderCard v-for="order in $store.state.orders" :key="order.id" :order="order" />
        </div>
    </div>
</template>
<script>
import OrderCard from '@/components/OrderCard.vue';

export default {
    name: 'CartPage',
    components: {
        OrderCard,
    },
    methods: {
        checkout() {
            this.$store.dispatch('checkout');
        },
    },
    computed: {
        calculateTotalPrice() {
            let price = 0;
            this.$store.state.orders.forEach((order,i) => {
                price += order.quantity * order.Product.price;
            })
            price = String(price);
            price = price.split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
            return `Rp. ${price}`;
        },
    },
    created() {
        this.$store.dispatch('fetchOrder');
    }
}
</script>