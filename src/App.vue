<template>
  <router-link to="/dashboard">Dashboard</router-link>
  <router-link to="/login">Login</router-link>
  <router-link to="/register">Register</router-link>
  <router-link to="/profile">Profile</router-link>
  <button @click.prevent="logout">Logout</button>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  methods: {
    async logout () {
      await localStorage.clear();
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style>
a, button {
  padding: 10px; margin: 10px;
}
</style>
