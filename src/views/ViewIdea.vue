<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm10 offset-sm1>
        <v-container>
          <v-card min-height="1000px" color="green" hover>
            <v-layout>
              <!-- <pre>{{ $data }}</pre> -->
              <v-flex xs12>
                <div class="heading">
                  {{ idea.title }}
                </div>
              </v-flex>
              <v-flex xs12>
                <div class="subheading">
                    {{ idea.content }}
                </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
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
