<template>
    <form @submit.prevent="registerUser" class="mt-3">
      <h2 class="text-center mb-3">Register a new User</h2>
        <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Enter Password">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password2" placeholder="Password Confirmation">
        </div>
        <button type="submit" class="btn btn-success">Sign Up</button>
        <button type="button" class="btn btn-danger mx-2" @click="toLogin">Cancel</button>
    </form>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      password2: '',
    };
  },
  methods: {
    registerUser() {
      if(this.password !== this.password2) {
        swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Password dont match'
        })
        this.password = '';
        this.password2 = '';
      } else {
        this.$store.dispatch('register', { 
        email: this.email,
        password: this.password 
        });
      }
    },
    toLogin() {
      this.$router.push({ path: '/login' });
    }
  },
};
</script>
