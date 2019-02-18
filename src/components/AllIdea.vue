<template>
  <div class="all-idea">
    <v-flex class="container__body">
      <h2>みんなのアイデア</h2>
      <v-flex xs12 sm6 offset-sm3>
        <v-container v-for="idea in ideas" :key="idea.id">
          <span>
            <v-card min-height="250px" color="green" hover>
              <v-layout>
                <router-link :to="{ name: 'ViewIdea', params: { id: idea.id } }">Idea</router-link>
                <h1>{{ idea.title }}</h1>
              </v-layout>
            </v-card>
          </span>
        </v-container>
      </v-flex>
      <v-flex xs12 sm12 style="margin: 16px;">
        <v-carousel xs12 sm12 hide-delimiters dark>
          <v-carousel-item v-for="(item, index) in ideas" :key="index" style="background-color: gray;">
            <v-container class="flex-container">
              <div class="catchyTitle">{{ item.title }}</div>
            </v-container>
          </v-carousel-item>
        </v-carousel>
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

<style lang="stylus">
.flex-container
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top 120px
.catchyTitle
  font-size 80px
  color yellow
</style>

