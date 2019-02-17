<template>
  <div class="home">
    <h2>僕らのビジネスアイデア道場</h2>
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
