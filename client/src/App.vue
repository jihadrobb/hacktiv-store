<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="$store.state.isLoggedIn">
      <a class="navbar-brand" href="#">Hacktiv Store</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item mt-2 mx-3">
            <router-link to="/">Products</router-link>
          </li>
          <li class="nav-item mt-2 mx-3">
            <router-link to="/cart">Cart</router-link>
          </li>
          <li class="nav-item mt-2 mx-3">
            <router-link to="/history">History</router-link>
          </li>
          <li class="nav-item mt-2 mx-3">
            <a @click="logout" href="">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
