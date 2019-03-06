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
                  <p><h3>{{ idea.contentMain }}</h3></p>
                </v-container>
                <v-container>
                  <v-layout row column>
                    <v-flex xs12 sm6 v-if="idea.contentInnovationPoint3">
                      <v-card hover class="container ideaCard">
                        <h4>(逆説の構造)</h4>
                        <p>ポイント：{{ idea.contentInnovationPoint1 }}</p>
                        <p>今までの常識：{{ idea.contentInnovationPoint2 }}</p>
                        <h3>逆転の発想：{{ idea.contentInnovationPoint3 }}</h3>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 v-if="idea.contentSocialPoint">
                      <v-card hover class="container ideaCard">
                        <h4>(どんな新しい社会が実現できるか)</h4>
                        <h3>{{ idea.contentSocialPoint }}</h3>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 v-if="idea.contentBusinessPoint">
                      <v-card hover class="container ideaCard">
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
.ideaCard {
    padding 0.5em 1em
    margin 2em 0
    font-weight bold
    background #222
    border solid 3px #6091d3/*線*/
    border-radius 10px/*角の丸み*/
}
</style>
