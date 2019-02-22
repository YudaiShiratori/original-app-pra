<template>
  <div id="app">
    <Navbar />
    <v-container class="main-content" style="text-align: center;">
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
.html
  height 100vh
  width 100vw
.main-content
  margin-top 70px
  margin-bottom 60px
</style>
