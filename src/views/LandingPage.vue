<template>
  <div class="landing-page">
    <v-container>
      <p>aaa</p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'LandingPage'
})
export default class LandingPage extends Vue {
}
</script>

<style lang="stylus">
.landing-page
  background-image url('../assets/code-coding-computer-574071-min.png')
</style>
