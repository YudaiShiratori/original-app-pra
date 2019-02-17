<template>
  <div class="footer">
    <v-footer
      color='gray'
      app>
      <span>&copy; {{ footarTitle }}</span>
    </v-footer>
  </div>
</template>



<script>
export default {
  name: 'Footer',
  data() {
    return {
      footarTitle: 'ourBusinessIdea'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
