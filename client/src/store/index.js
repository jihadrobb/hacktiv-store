import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router/index.js';
import swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    orders: [],
    product: {},
    history: [],
    isLoggedIn: false,
  },
  mutations: {
    SET_PRODUCTS(state, prods) {
      state.products = prods;
    },
    SET_ORDERS(state, ords) {
      state.orders = ords;
    },
    SET_PRODUCT(state, prod) {
      state.product = prod;
    },
    SET_HISTORY(state, hist) {
      state.history = hist;
    },
    SET_LOGIN(state, login) {
      state.isLoggedIn = login;
    }
  },
  actions: {
    login(context, payload) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          context.commit('SET_LOGIN', true);
          return swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .then(_ => {
          router.push({ path: '/' });
        })
        .catch(err => {
          // console.log(err.response);
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        });
    },
    setLogin(context, payload) {
      context.commit('SET_LOGIN', payload.login);
    },
    logout(context, payload) {
      swal.fire({
        icon: 'success',
        title: 'Logged out',
        showConfirmButton: false,
        timer: 1500
      })
        context.commit('SET_LOGIN', false);
        localStorage.removeItem('token');
        router.push({ path: '/login' });
    },
    register(context, payload) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/register`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then( _ => {
          swal.fire({
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
          })
          router.push({ path: '/login' });
        })
    },
    fetchProducts(context, payload) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/products`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data);
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    fetchOneProduct(context, payload) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/products/${payload.id}`,
        headers: { token: localStorage.token }
      })
        .then(({data}) => {
          context.commit('SET_PRODUCT', data);
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    createOrder(context, payload) {
      // console.log(payload);
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/orders`,
        headers: { token: localStorage.token },
        data: {
          quantity: payload.quantity,
          ProductId: payload.ProductId,
        }
      })
        .then( _ => {
          swal.fire({
            icon: 'success',
            title: 'Order added to cart',
          })
          context.dispatch('fetchProducts');
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    fetchOrder(context, payload) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/orders`,
        headers: { token: localStorage.token },
      })
        .then(({data}) => {
          // console.log(data, ' <<< order');
          context.commit('SET_ORDERS', data);
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    deleteOrder(context, payload) {
      axios({
        method: 'delete',
        url: `${this.state.baseUrl}/orders/${payload.id}`,
        headers: { token: localStorage.token }
      })
        .then( _ => {
          swal.fire({
            icon: 'success',
            title: 'Order deleted',
          })
          context.dispatch('fetchOrder');
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    },
    checkout(context, payload) {
      if(this.state.orders.length === 0) {
        swal.fire({
          icon: 'error',
          title: 'You dont have any orders',
        })
      } else {
        axios({
          method: 'get',
          url: `${this.state.baseUrl}/checkout`,
          headers: { token: localStorage.token }
        })
        .then( _ => {
          swal.fire({
            title: 'Sweet!',
            imageUrl: 'https://i.ebayimg.com/images/g/KAcAAOSwR6RZ8jxE/s-l400.jpg',
            imageWidth: 400,
            imageHeight: 400,
            text: 'We hope to see you again in near future'
          })
          router.push({ path: '/' });
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
      }
    },
    fetchHistory(context, payload) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/history`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          context.commit('SET_HISTORY', data);
        })
        .catch(err => {
          swal.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  },
  modules: {
  },
});
