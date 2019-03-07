<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm12>
        <template>
          <v-container class="ideaBody">
            <div class="image-area">
              <div class="ideaTitle">{{ idea.title }}</div>
            </div>
            <v-card>
              <div class="ideaText">
                <v-container>
                  <h4>どんなアイデアか</h4>
                  <h1>{{ idea.contentMain }}</h1>
                </v-container>
                <v-container>
                  <v-layout row column>
                    <v-flex xs12 sm6 v-if="idea.contentInnovationPoint3">
                      <v-card hover class="ideaCard">
                        <h4>(逆説の構造)</h4>
                        <p>ポイント：{{ idea.contentInnovationPoint1 }}</p>
                        <p>今までの常識：{{ idea.contentInnovationPoint2 }}</p>
                        <h3>逆転の発想：{{ idea.contentInnovationPoint3 }}</h3>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 v-if="idea.contentSocialPoint">
                      <v-card hover class="ideaCard">
                        <h4>(どんな新しい社会が実現できるか)</h4>
                        <h3>{{ idea.contentSocialPoint }}</h3>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 v-if="idea.contentBusinessPoint">
                      <v-card hover class="ideaCard">
                        <h4>(どうやって収益化するか)</h4>
                        <h3>{{ idea.contentBusinessPoint }}</h3>
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
  background-image url('../assets/code-coding-computer-574071-min.png')
  background-size cover
.ideaTitle
  font-size 3em
  font-weight 700
  line-height 1.5em
  margin-top 0
  margin-bottom 24px
  letter-spacing 1px
.ideaText
  margin 20px 0
  line-height 3em
  border solid 3px #2F4F4F/*線*/
  border-radius 10px/*角の丸み*/
  background rgba(220, 220, 220, 0.4)
.ideaCard
  padding 0.5em 1em
  margin 2em 0
  font-weight bold
  border solid 3px #2F4F4F/*線*/
  border-radius 10px/*角の丸み*/
  background-color rgba(220, 220, 220, 0.4)
</style>
