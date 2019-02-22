<template>
  <div class="home">
    <h2>みんなのアイデア</h2>
    <!-- <RecentIdea /> -->
    <AllIdea />
  </div>
</template>

<script>
import AllIdea from '@/components/AllIdea'
export default {
  name: 'Home',
  components: {
    AllIdea,
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="stylus">
.home h2 {
  margin-bottom 10px
}
</style>
