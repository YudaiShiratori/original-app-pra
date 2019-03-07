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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

@Component({
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
.html
  height 100vh
  width 100vw
body
  background #EFEFEF
  font-family serif
.main-content
  margin-top 70px
  margin-bottom 60px
</style>
