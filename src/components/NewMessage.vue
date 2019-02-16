<template>
  <div class="new-message">
    <p>{{ this.name }}</p>
    <form @submit.prevent="addMessage">
      <label for="new-message">NewMessage (enter to add)</label>
      <input type="text" name="new-message" v-model="newMessage">
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'

export default {
  name: 'NewMessage',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, this.name, Date.now())
      if(this.newMessage){
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'err'
      }
    }
  }
}
</script>
