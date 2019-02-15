<template>
  <div class="navbar">
    <nav>
      <div class="container">
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Signup' }">signup</router-link>
          </li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'Navbar',
  data() {
    return {
    } 
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    // created () {
    //   let user = firebase.auth().currentUser
    // }
  }
}
</script>

<style>

</style>
