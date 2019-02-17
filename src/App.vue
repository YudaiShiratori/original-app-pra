<template>
  <div id="app">
    <Navbar />
    <v-container class="main-content">
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="stylus">
.main-content
  margin-top 60px
</style>
