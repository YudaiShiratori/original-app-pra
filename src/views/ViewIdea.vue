<template>
  <div class="container">
    <v-flex class="container__body">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
              <!-- <pre>{{ $data }}</pre> -->
            <v-card-title>
              <v-layout column>
                <h2>{{ idea.title }}</h2>
              </v-layout>
            </v-card-title>
            <v-card-content>
              <v-layout column>
                <h2>{{ idea.content }}</h2>
              </v-layout>
            </v-card-content>
          </v-card>
        </v-flex>
      </v-layout>
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
