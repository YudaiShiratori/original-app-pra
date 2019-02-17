<template>
  <div class="idea-view">
    <v-flex class="container__body">
      <h2>Idea-view {{ ideaId }}</h2>
      <v-flex xs12 sm6 offset-sm3>
        <v-container>
          <v-card>
            <v-card-title>
              <h2>{{ idea.title }}</h2>
              <p>{{ idea.content }}</p>
            </v-card-title>
          </v-card>
        </v-container>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'

export default {
  name: 'ViewIdea',
  props: ['idea_id'],
  data() {
    return {
      ideaId: this.$route.params.idea_id
    }
  },
  created() {
    let ref = db.collection('ideas').where('id', '==', this.$route.params.idea_id)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let idea = doc.data()
        this.idea.id = doc.id
      })
    })
  },
}
</script>
