<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <template>
            <v-container class="ideaBody">
              <div class="ideaTitle">{{ idea.title }}</div>
              <div class="ideaText">
                <div>
                  <p>どんなアイデアか</p>
                  <h4>{{ idea.contentMain }}</h4>
                </div>
                <div>
                  <p>社会的なポイント</p>
                  <h5>{{ idea.contentSocialPoint }}</h5>
                </div>
                <div>
                  <p>収益化ポイント</p>
                  <h5>{{ idea.contentBusinessPoint }}</h5>
                </div>
              </div>
            </v-container>
          </template>
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
