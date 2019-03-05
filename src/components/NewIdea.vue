<template>
  <div class="new-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm6 offset-sm3>
          <v-form ref="form">
            <v-container xs12 sm12 style="padding: 0;">
              <h2>あなたのアイデア</h2>
              <v-container>
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
                  v-model="contentMain"
                ></v-textarea>
                <h2>ヒント</h2><span>*必ずしも入力せずとも大丈夫です</span>
                <h3>創造性：</h3>
                <h4>逆説の構造</h4>
                <v-text-field
                  label="起点"
                  outline
                  v-model="contentInnovationPoint1"
                ></v-text-field>
                <v-text-field
                  label="定説"
                  outline
                  v-model="contentInnovationPoint2"
                ></v-text-field>
                <v-text-field
                  label="逆説"
                  outline
                  v-model="contentInnovationPoint3"
                ></v-text-field>
                <h3>社会性：</h3>
                <v-text-field
                  label="どんな新しい社会が実現できるか"
                  outline
                  v-model="contentSocialPoint"
                ></v-text-field>
                <h3>経済合理性：</h3>
                <v-text-field
                  label="どうやって収益化するか"
                  outline
                  v-model="contentBusinessPoint"
                ></v-text-field>
                </v-flex>
                <div id="app">
                  <h2>↓画像↓</h2>
                  <img v-show="uploadedImage" :src="uploadedImage" />
                  <input type="file" v-on:change="onFileChange">
                </div>
                <v-flex xs12>
                <p v-if="feedback">{{ feedback }}</p>
                <v-btn
                  color="red"
                  class="white--text"
                  @click.prevent="shareIdea">
                  アイデアをシェア
                </v-btn>
                </v-flex>
              </v-container>
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
      contentMain: null,
      feedback: null,
      contentBusinessPoint: null,
      contentSocialPoint: null,
      contentInnovationPoint1: null,
      contentInnovationPoint2: null,
      contentInnovationPoint3: null,
      uploadedImage: ''
    }
  },
  methods: {
    shareIdea: function(event) {
      console.log(
        this.title, this.contentMain,this.contentSocialPoint, this.contentBusinessPoint,
        this.contentInnovationPoint1, this.contentInnovationPoint2, this.contentInnovationPoint3
      )
      if (this.title && this.contentMain) {
        db.collection('ideas').add({
          title: this.title,
          contentMain: this.contentMain,
          contentSocialPoint: this.contentSocialPoint,
          contentBusinessPoint: this.contentBusinessPoint,
          contentInnovationPoint1: this.contentInnovationPoint1,
          contentInnovationPoint2: this.contentInnovationPoint2,
          contentInnovationPoint3: this.contentInnovationPoint3
        }).then(() => {
          this.$router.push({ name: 'Home'})
        }).catch(err => {
          console.log(err)
        })
        clear()
      } else {
        this.feedback = 'error'
      }
    },
    clear() {
      this.title = null
      this.contentMain = null
      this.contentSocialPoint = null,
      this.contentBusinessPoint = null,
      this.contentInnovationPoint1 = null,
      this.contentInnovationPoint2 = null,
      this.contentInnovationPoint3 = null
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>
