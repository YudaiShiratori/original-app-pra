<template>
  <div class="new-idea container">
    <form @submit.prevent="shareIdea">
      <h2>あなたのアイデア</h2>
      <div class="field">
        <label for="title">あなたのビジネスを一言で説明してください：</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field">
        <label for="content">具体的な内容：</label>
        <input type="text" name="content" v-model="content">
      </div>
      <div class="field center">
        <button>
          Share!
        </button>
      </div>
    </form>
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
    }
  },
  methods: {
    shareIdea() {
      console.log(this.title, this.content)
      if(this.title && this.content) {
        db.collection('ideas').add({
          title: this.title,
          content: this.content
        }).catch(err => {
          console.log(err)
        })
        this.title = null
        this.content = null
      } else {
        console.log(err)
      }
    }
  }
}
</script>
