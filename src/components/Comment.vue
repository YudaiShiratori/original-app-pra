<template>
  <div class="comment container">
    <!-- <h2 class="center teal-text">Chat {{ this.name }}</h2> -->
    <div class="card">
      <div class="card-content">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <!-- <span class="teal-text">{{ message.name }}</span> -->
            <span class="grey-text text-darken-3">{{ message.content }}</span>
            <!-- <span class="grey-text time">{{ message.timestamp }}</span> -->
          </li>
        </ul>
      </div>
      <div class="card-action">
        <v-flex xs12 sm6 offset-sm3>
          <v-form @submit.prevent="addMessage">
            <v-container>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="newMessage"
                  placeholder="enter to add:"
                  style="min-width: 250px;"
                  outline
                  v-model="newMessage"
                ></v-text-field>
              </v-flex>
            </v-container>
          </v-form>
        </v-flex>
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

<style>
.comment h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.comment span {
  font-size: 1.4em;
}
.comment .time {
  display: block;
  font-size: 0.8em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>
