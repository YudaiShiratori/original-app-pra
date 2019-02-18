<template>
  <div class="container">
    <v-flex class="container__body">
       <v-card height="600px" flat>
         <v-container>
           <h2>Login</h2>
           <v-form>
             <p>aaa</p>
           </v-form>
           <v-btn @click="changetoSignup">signup</v-btn>
         </v-container>
       </v-card>
    </v-flex>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
    }
  },
  methods: {
    changetoSignup() {
      this.$router.push({ name: 'Signup' })
    }
  }
}
</script>

