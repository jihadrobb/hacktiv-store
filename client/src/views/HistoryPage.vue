<template>
    <div>
        <h3 class="text-center">Order History</h3>
        <div class="row d-flex justify-content-center">
            <OrderCard v-for="order in $store.state.history" :key="order.id" :order="order" />
        </div>
    </div>
</template>

<script>
import OrderCard from '@/components/OrderCard.vue';

export default {
    name: 'HistoryPage',
    components: {
        OrderCard,
    },
    created() {
        this.$store.dispatch('fetchHistory');
    }
}
</script>