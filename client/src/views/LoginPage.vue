<template>
    <form @submit.prevent="loginUser">
        <div class="form-group">
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Enter Password">
        </div>
        <small>Dont have account? click <a href="" @click="toRegister">here</a> to register!</small><br>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch('login', { 
        email: this.email,
        password: this.password 
      });
    },
    toRegister() {
      this.$router.push({ path: '/register' });
    }
  },
};
</script>
