<template>
  <div class="all-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm10 offset-sm1 style="margin-top: 30px;">
        <v-container>
          <h2>アイデア一覧</h2>
          <v-container v-for="idea in ideas" :key="idea.id" class="flex-container">
            <v-layout row column>
              <v-flex xs6 order-lg2>
                <v-card class="idea-area">
                  <h1><strong>{{ idea.title }}</strong></h1>
                　<router-link :to="{ name: 'ViewIdea', params: { id: idea.id } }">詳しく見る！</router-link>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
        <v-container>
          <h2>新着・おすすめアイデア</h2>
          <v-container>
            <v-carousel 
              xs12 sm12
              hide-delimiters
              height="30vh">
              <v-card>
                <v-carousel-item v-for="(item, index) in ideas" :key="index" style="background-color: gray;">
                  <p @click="openIdea(item)" class="catchyTitle">{{ item.title }}</p>
                </v-carousel-item>
              </v-card>
            </v-carousel>
          </v-container>
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
  methods: {
    openIdea(idea) {
      this.$router.push({ name: 'ViewIdea', params: { id : idea.id } })
    }
  }
}
</script>

<style lang="stylus">
.flex-container
  display flex
.catchyTitle
  font-size 8vh
  color yellow
  // top 50%
  // -ms-transform translateY(-50%)
  // -webkit-transform translateY(-50%)
  // transform translateY(-50%)
  position absolute
  text-align center
  padding 20px
  margin auto
  top 0
  bottom 0
  left 0
  right 0
.idea-area
  padding 24px
  background-color #FFF
  border-top 1px solid #EAEAEA
</style>
