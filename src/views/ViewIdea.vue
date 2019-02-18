<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm6 offset-sm3>
        <h2>idea</h2>
        {{ idea.id }}
        {{ idea }}
        <!-- <Opinion /> -->
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'
// import Opinion from '@/components/Opinion'

export default {
  name: 'ViewIdea',
  // component: {
  //   Opinion
  // },
  data() {
    return {
      idea: {}
    }
  },
  created() {
    // this.id = this.$route.params.id
    db.collection('ideas').where('id', '==', this.$route.params.id)
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        let idea = doc.data()
        console.log(doc.data())
        this.idea.id = doc.id
      })
    })
  },
}
</script>
