<template>
  <div class="make-idea">
    <h3>あなたのアイデアで世界を変えよう！</h3>
    <v-container>
      <NewIdea />
    </v-container>
  </div>
</template>

<script>
import NewIdea from '@/components/NewIdea'
export default {
  name: 'MakeIdea',
  components: {
    NewIdea,
  },
  data() {
    return {
    }
  },
}

</script>