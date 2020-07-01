<template>
    <div>
        <h3>Your Cart</h3>
        <button class="btn btn-warning" @click="checkout">Checkout</button>
        <div class="row d-flex justify-content-center">
            <OrderCard v-for="order in $store.state.orders" :key="order.id" :order="order" />
        </div>
    </div>
</template>
<script>
import OrderCard from '@/components/OrderCard.vue';
import swal from 'sweetalert2';

export default {
    name: 'CartPage',
    components: {
        OrderCard,
    },
    methods: {
        checkout() {
            if(this.$store.state.orders.length === 0) {
                swal.fire({
                icon: 'error',
                title: 'You dont have any orders',
                })
            } else {
                let products = '';
                let totalPrice = 0;
                this.$store.state.orders.forEach(el => {
                    products += `<tr>\n<td class="col-md-9"><em>${el.Product.name}</em></h4></td>\n`
                    products += `<td class="col-md-1" style="text-align: center">${el.quantity}</td>\n`
                    products += `<td class="col-md-1 text-center">${this.getPrice(el.Product.price)}</td>\n`
                    products += `<td class="col-md-1 text-center">${this.getTotalPrice(el)}</td>\n</tr>`
                    totalPrice += el.quantity * el.Product.price;
                })
                let priceShipping = this.getPrice(totalPrice + 10000);
                totalPrice = this.getPrice(totalPrice);
                swal.fire({
                    html: 
                    `
                    <div class="container">
                        <div class="row">
                            <div class="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-6 col-md-6 text-right">
                                        <p>Receipt #: ${Math.floor(Math.random() * 1000) + 1}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="text-center">
                                        <h1>Receipt</h1>
                                    </div>
                                    </span>
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th class="text-center">Price</th>
                                                <th class="text-center">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${products}
                                                <td>   </td>
                                                <td>   </td>
                                                <td class="text-right">
                                                <p>
                                                    <strong>Subtotal: </strong>
                                                </p>
                                                <p>
                                                    <strong>Shipping Cost: </strong>
                                                </p></td>
                                                <td class="text-center">
                                                <p>
                                                    <strong>${totalPrice}</strong>
                                                </p>
                                                <p>
                                                    <strong>Rp. 10.000</strong>
                                                </p></td>
                                            </tr>
                                            <tr>
                                                <td>   </td>
                                                <td>   </td>
                                                <td class="text-right"><h4><strong>Total: </strong></h4></td>
                                                <td class="text-center text-danger"><h4><strong>${priceShipping}</strong></h4></td>
                                            </tr>
                                        </tbody>
                                    </table></td>
                                </div>
                            </div>
                    </div>
                    `,
                    confirmButtonText: 'Pay'
                })
                .then(({ value }) => {
                    if(value) {
                        this.$store.dispatch('checkout');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        getPrice(price) {
            price = String(price);
            price = price.split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
            return `Rp. ${price}`;
        },
        getTotalPrice(order){
            let price = 0;
            price += order.quantity * order.Product.price;
            return this.getPrice(price);
        }
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