<template>
    <div class="card m-3 " style="width: 18rem;">
        <img class="card-img-top" :src="order.Product.image_url" :alt="order.Product.name">
        <div class="card-body">
            <h5 class="card-title">{{ order.Product.name }}</h5>
            <p class="card-text">Quantity: {{ order.quantity }}</p>
            <div class="input-group mb-3 d-flex justify-content-center">
                <button class="btn btn-danger" v-if="!order.paid" @click="deleteOrder(order.id)">Delete</button>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted">Total Price: {{ priceString(order.quantity * order.Product.price) }}</small><br>
            <small class="text-muted" v-if="order.paid">Bought on: {{ new Date(order.updatedAt).toDateString() }}</small>
        </div>
    </div>
</template>


<script>

export default {
    name: 'OrderCard',
    props: ['order'],
    methods: {
        deleteOrder(id){
            this.$store.dispatch('deleteOrder', { id });
        },
        priceString(price) {
            price = String(price);
            price = price.split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
            return `Rp. ${price}`;
        }
    },
}
</script>
<style scoped>

</style>