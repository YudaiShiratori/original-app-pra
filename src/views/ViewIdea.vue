<template>
  <div class="container">
    <v-flex class="container__body">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <v-layout column>
                <h2>{{ idea.title }}</h2>
              </v-layout>
            </v-card-title>
            <v-card-content>
              <v-layout column>
                <h2>{{ idea.contentMain }}</h2>
                <h2>{{ idea.contentSocialPoint }}</h2>
                <h2>{{ idea.contentBusinessPoint }}</h2>
              </v-layout>
            </v-card-content>
          </v-card>
        </v-flex>
      </v-layout>
      <Comment />
    </v-flex>
  </div>
</template>


<script>
import db from '@/firebase/firebaseConfig'
import Comment from '@/components/Comment'

export default {
  name: 'ViewIdea',
  component: {
    Comment
  },
  data() {
    return {
      idea: null
    }
  },
  created() {
    db.collection('ideas').doc(this.$route.params.id)
    .get().then(doc => {
        this.idea = doc.data()
    })
  }
}
</script>
