<template>
  <div class="comment container">
    <div class="card">
      <p>このアイデアを実現するには? アドバイス一覧</p>
      <div class="card-content">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <v-container class="textbox">
              <p class="grey-text text-darken-3">{{ message.content }}</p>
            </v-container>
          </li>
        </ul>
      </div>
      <br>
      <div class="card-action">
        <!-- <v-flex xs12 sm12> -->
          <v-form @submit.prevent="addMessage">
            <!-- <v-container> -->
              <!-- <v-flex xs12 sm6 md3> -->
                <v-textarea
                  placeholder="実現を手助けするアドバイスは何かありますか？:"
                  width="100%"
                  outline
                  v-model="newMessage"
                ></v-textarea>
              <!-- </v-flex> -->
            <!-- </v-container> -->
          </v-form>
        <!-- </v-flex> -->
      </div>
    </div>
  </div>
</template>

<script>
// import NewMessage from '@/components/NewMessage'
import db from '@/firebase/firebaseConfig'
// import moment from 'moment'

export default {
  name: 'Comment',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null,
      messages: []
    }
  },
  created () {
    let ref = db.collection('messages')
    // .orderBy('timestamp')

    ref.onSnapshot( snapshot => {
      console.log(snapshot.docChanges())
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            // timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, this.name, Date.now())
      if(this.newMessage){
        db.collection('messages').add({
          content: this.newMessage,
          // name: this.name,
          // timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = null
        this.feedback = null
      }
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

.messages-webkit-scrollbar 
  width 3px

.messages-webkit-scrollbar-track 
  background #ddd

.messages-webkit-scrollbar-thumb 
  background #aaa

.textbox
  border solid 1px black/*線*/
  border-bottom none
  font-size 1.4em
  text-align left
  background-color white
  opacity 0.7
</style>