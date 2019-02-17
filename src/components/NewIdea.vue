<template>
  <div class="new-idea">
    <v-flex class="container__body">
      <p>{{ this.name }}</p>
      <v-flex xs12 sm6 offset-sm3>
          <v-form @submit.prevent="shareIdea">
            <v-container xs12 sm12 style="padding: 0;">
              <v-flex xs12>
                <h2>あなたのアイデア</h2>
                <v-text-field
                  label="コンセプト"
                  placeholder="あなたのビジネスを一言で説明してください："
                  outline
                  v-model="title"
                ></v-text-field>
                <v-textarea
                  outline
                  name="content"
                  label="具体的な内容："
                  rows="30"
                ></v-textarea>
                </v-flex>
              </v-container>
          </v-form>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import slugify from 'slugify';
import db from '@/firebase/firebaseConfig';
import firebase from 'firebase';

export default {
  name: 'NewIdea',
  data() {
    return {
      title: null,
      content: null,
      feedback: null,
    }
  },
  methods: {
    shareIdea() {
      console.log(this.title, this.content)
      if (this.title && this.content) {
        db.collection('ideas').add({
          title: this.title,
          content: this.content,
        }).catch(err => {
          console.log(err)
        })
        this.title = null
        this.content = null
      } else {
        this.feedback = 'error'
      }
    },
  },
}
</script>
