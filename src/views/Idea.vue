<template>
  <div class="idea">
    <h2>ビジネスアイデア</h2>
    <!-- <ViewIdea /> -->
    <Opinion />
  </div>
</template>

<script>
import ViewIdea from '@/components/ViewIdea'
import Opinion from '@/components/Opinion'

export default {
  name: 'Idea',
  props: ['idea_id'],
  components: {
    ViewIdea,
    Opinion,
  },
  data() {
    return {
    }
  },
}
</script>
