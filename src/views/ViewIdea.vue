<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm12>
        <template>
          <v-container class="ideaBody">
            <div class="ideaTitle">{{ idea.title }}</div>
            <v-card>
              <div class="ideaText">
                <v-container>
                  <h4>どんなアイデアか</h4>
                  <p>{{ idea.contentMain }}</p>
                </v-container>
                <v-container>
                  <v-layout row column>
                    <v-flex xs12 sm6>
                      <v-card color="green" hover>
                        <h4>社会的なポイント</h4>
                        <p>{{ idea.contentSocialPoint }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-card color="green" hover>
                        <h4>収益化ポイント</h4>
                        <p>{{ idea.contentBusinessPoint }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-card>
          </v-container>
        </template>
      </v-flex>
      <!-- <Comment /> -->
    </v-flex>
  </div>
</template>


<script>
import db from '@/firebase/firebaseConfig'
import Comment from '@/components/Comment'

export default {
  name: 'ViewIdea',
  components: {
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

<style lang="stylus">
.ideaBody
  font-size 16px
  width 100%
.ideaTitle
  font-size 28px
  font-weight 700
  line-height 1.5em
  margin-top 0
  margin-bottom 24px
  letter-spacing 1px
.ideaText
  margin 20px 0
  line-height 1.8em
</style>
