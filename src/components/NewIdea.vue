<template>
  <div class="new-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form">
            <v-container xs12 sm12 style="padding: 0;">
              <h2>あなたのアイデア</h2>
              <v-flex xs12>
              <v-text-field
                label="コンセプト"
                placeholder="あなたのビジネスを一言で説明してください："
                outline
                v-model="title"
              ></v-text-field>
              </v-flex>
              <v-flex xs12>
              <v-textarea
                outline
                label="具体的な内容："
                rows="30"
                v-model="content"
              ></v-textarea>
              </v-flex>
              <v-flex xs12>
                {{ title }}
                {{ content }}
              <v-btn
                color="red"
                class="white--text"
                @click.prevent="shareIdea">
                アイデアをシェア
              </v-btn>
              <p v-if="feedback">{{ feedback }}</p>
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
    shareIdea: function(event) {
      console.log(this.title, this.content)
      if (this.title && this.content) {
        db.collection('ideas').add({
          title: this.title,
          content: this.content,
        }).then(() => {
          this.$router.push({ name: 'Home'})
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
