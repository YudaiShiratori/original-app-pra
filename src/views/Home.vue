<template>
  <div class="home">
    <h1>みんなのアイデア</h1>
    <AllIdea />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AllIdea from '@/components/AllIdea.vue'
@Component({
  name: 'Home',
  components: {
    AllIdea,
  }
})
export default class Home extends Vue {
}
</script>

<style lang="stylus">
.home h2
  margin-bottom 10px
</style>
