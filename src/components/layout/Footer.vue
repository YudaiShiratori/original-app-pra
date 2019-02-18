<template>
  <div class="footer">
    <v-footer
      color='gray'
      app>
      <span>&copy; {{ footerTitle }}</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerTitle: 'ourBusinessIdea'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
