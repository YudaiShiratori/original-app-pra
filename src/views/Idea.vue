<template>
  <div class="idea">
    <h2>ビジネスアイデア</h2>
    <ViewIdea />
    <!-- <Opininon /> -->
  </div>
</template>

<script>
import ViewIdea from '@/components/ViewIdea'
export default {
  name: 'Idea',
  props: ['idea_id'],
  components: {
    ViewIdea,
  },
  data() {
    return {
    }
  },
}
</script>
