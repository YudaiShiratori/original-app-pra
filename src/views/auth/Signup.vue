<template>
  <div class="signup">
    <h2>Signup</h2>
    <v-btn @click="changetoLogin">Login</v-btn>
  </div>
</template>



<script>
export default {
  name: 'Signup',
  data(){
    return {

    }
  },
  methods: {
    changetoLogin() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

