<template>
  <div class="all-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm12>
        <h3>新着アイデア</h3>
        <v-carousel 
          xs12 sm12
          hide-delimiters
          dark>
          <v-carousel-item v-for="(item, index) in ideas" :key="index" style="background-color: gray;">
            <v-container class="flex-container">
              <div class="catchyTitle">
                <p @click="openIdea(item)">{{ item.title }}</p>
              </div>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 sm12 style="margin-top: 30px;">
        <h3>おすすめアイデア</h3>
        <v-container v-for="idea in ideas" :key="idea.id" class="flex-container">
          <v-layout row column>
            <v-flex xs6 order-lg2>
              <v-card color="green" hover min-height="250px">
                <h1><strong>{{ idea.title }}</strong></h1>
              　<router-link :to="{ name: 'ViewIdea', params: { id: idea.id } }">詳しく見る！</router-link>
              </v-card>
            </v-flex>
          </v-layout>
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
  height 60vh
.catchyTitle
  font-size 80px
  color yellow
</style>
