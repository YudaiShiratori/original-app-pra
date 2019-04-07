<template>
  <div class="comment">
    <br>
    <br>
    <div class="card">
      <p>このアイデアを実現するには? アドバイス一覧</p>
      <div class="card-content">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <v-container class="textbox">
              <span class="grey-text text-darken-3">{{ message.content }}</span>
            </v-container>
          </li>
        </ul>
      </div>
      <br>
      <div class="card-action">
        <!-- <v-flex xs12 sm12> -->
          <v-form>
            <!-- <v-container> -->
              <!-- <v-flex xs12 sm6 md3> -->
                <v-textarea
                  placeholder="実現を手助けするために何かアドバイスはありますか？:"
                  width="100%"
                  outline
                  v-model="newMessage"
                />
                <v-btn
                  color="blue"
                  class="white--text"
                  @click.prevent="addMessage">
                  アドバイスを投稿
                </v-btn>       
              <!-- </v-flex> -->
            <!-- </v-container> -->
          </v-form>
        <!-- </v-flex> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import firebase from 'firebase/app'
import db from '@/firebase/firebaseConfig'
@Component({
  name: 'Comment'
})
export default class Comment extends Vue {
  
  isLoading: boolean = false 
  newMessage: string = ''
  messages: any[] = []

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
      this.messages = []
      const items: firebase.firestore.QuerySnapshot = await db.collection('ideas').doc(this.$route.params.id).collection('messages').get()
      items.docs.forEach((item: firebase.firestore.QueryDocumentSnapshot) => {
        let message = {
          id: item.id,
          content: item.data().content
        }
        this.messages.push(message)
      })
      console.log(this.messages)
    } catch (error) {
      console.error('firebase error', error)
    }
  }

  addMessage() {
    if(this.newMessage){
      db.collection('ideas').doc(this.$route.params.id).collection('messages').add({
        content: this.newMessage,
      }).catch(err => {
        console.log(err)
      })
      this.newMessage = ''
    }
  }

}
</script>

<style lang="stylus">
.comment h2 
  font-size 2.6em
  margin-bottom 40px

.comment span 
  font-size 1.4em
  padding-left 56px
  display block
  line-height 176%

.comment .time 
  display block
  font-size 0.8em

.messages 
  max-height 300px
  overflow auto
  list-style none
  padding-left 0

.messages-webkit-scrollbar 
  width 3px

.messages-webkit-scrollbar-track 
  background #ddd

.messages-webkit-scrollbar-thumb 
  background #aaa

.textbox
  border solid 1px black/*線*/
  font-size 1.4em
  text-align left
</style>