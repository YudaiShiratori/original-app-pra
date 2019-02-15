<template>
  <div class="make-idea">
    <h2>あなたのアイデアで世界を変えよう！</h2>
    <NewIdea />
  </div>
</template>

<script>
import NewIdea from '@/components/NewIdea'
export default {
  name: 'MakeIdea',
  components: {
    NewIdea
  },
  data () {
    return {
    }
  }
}

</script>