<template>
  <div class="all-idea">
    <h2>みんなのアイデア</h2>
    <div v-for="idea in ideas" :key="idea.id">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <h3>{{ idea.title }}</h3>
        </v-card>
      </v-flex>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'

export default {
  name: 'AllIdea',
  data () {
    return {
      ideas: []
    }
  },
  created() {
    db.collection('ideas').get().
    then(snapshot => {
      snapshot.forEach(doc => {
        let idea = doc.data()
        idea.id = doc.id
        this.ideas.push(idea)
      })
    })
  }
}

</script>