<template>
  <div class="all-idea">
    <section v-if="isLoading" class="before-load-content">
      LOADING NOW
    </section>
    <section v-else>
      <v-flex class="container__body">
        <h2>アイデア一覧</h2>
        <v-container v-for="idea in ideas" :key="idea.id">
          <v-card class="idea-area">
            <v-container>
              <p class="ideaCatchTitle">{{ idea.title }}</p>
          　  <router-link :to="{ name: 'ViewIdea', params: { id: idea.id } }">詳しく見る！</router-link>
            </v-container>
          </v-card>
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
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import db from '@/firebase/firebaseConfig'
import { DataSource } from '@/model/DataSource'
@Component({
  name: 'AllIdea'
})
export default class AllIdea extends Vue {

  ideas: any[] = []
  isLoading: boolean = false

  mounted() {
    this.getItems()
  }

  async getItems() {
    console.log('getItems')
    this.isLoading = true
    await this.readFirestore()
    this.isLoading = false
  }

  async readFirestore() {
    try {
      this.ideas = []
      const items: firebase.firestore.QuerySnapshot = await db.collection('ideas').get()
      items.docs.forEach((item: firebase.firestore.QueryDocumentSnapshot) => {
        let idea = item.data()
        idea.id = item.id
        idea.title = idea.title.replace(/\n/g, '<br>')
        this.ideas.push(idea)
      })
      console.log(this.ideas)
      // const ideas = new DataSource()
      // await ideas.getAllIdea()
    } catch (error) {
      console.error('firebase error', error)
    }
  }

  openIdea(idea: any) {
    this.$router.push({ name: 'ViewIdea', params: { id : idea.id } })
  }

}
</script>

<style lang="stylus">
.container
  max-width 800px
.catchyTitle
  font-size 8vh
  color yellow
  position absolute
  text-align center
  padding 20px
  margin auto
  top 0
  bottom 0
  left 0
  right 0
.idea-area
  border 1px solid #EAEAEA
  width 100%
  height 250px
  text-align center
  background-image url('../assets/code-coding-computer-574071-min.png')
  background-size cover
.ideaCatchTitle
  color white
  font-size 3em
  background-color black
  opacity 0.8
.before-load-content
  position absolute
  top 0
  left 0
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  color #bbb
  font-size 2em
</style>
