<template>
    <div>
        <h3>YOUR CART</h3>
        <button class="btn btn-warning" @click="checkout">Checkout</button>
        <div class="card-group">
            <OrderCard v-for="order in $store.state.orders" :key="order.id" :order="order" />
        </div>
    </div>
</template>
<script>
import OrderCard from '@/components/OrderCard.vue';
import axios from 'axios';
import swal from 'sweetalert2';

export default {
    name: 'CartPage',
    components: {
        OrderCard,
    },
    methods: {
        checkout() {
            this.$store.dispatch('checkout');
        }
    },
    created() {
        this.$store.dispatch('fetchOrder');
    }
}
</script>