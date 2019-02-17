<template>
  <div class="all-idea">
    <v-flex class="container__body">
      <h2>みんなのアイデア</h2>
      <v-flex xs12 sm6 offset-sm3>
        <v-container v-for="idea in ideas" :key="idea.id">
          <span>
            <v-card min-height="250px" color="green" hover>
              <v-layout> 
                <router-link :to="{ name: 'Idea', params: { idea_id: idea.id } }">Idea</router-link>
                <h1>{{ idea.title }}</h1>
              </v-layout>
            </v-card>
          </span>
        </v-container>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'

export default {
  name: 'AllIdea',
  data() {
    return {
      ideas: [],
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
  },
}
</script>