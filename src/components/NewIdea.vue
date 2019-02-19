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
              </v-flex>
              <v-flex xs12>
              <v-textarea
                outline
                label="具体的な内容："
                rows="30"
                v-model="content"
              ></v-textarea>
              <h2>ヒント</h2><span>*必ずしも入力せずとも大丈夫です</span>
              <h3>創造性：</h3>
              <h4>逆説の構造</h4>
              <v-text-field
                label="起点"
                outline
              ></v-text-field>
              <v-text-field
                label="定説"
                outline
              ></v-text-field>
              <v-text-field
                label="逆説"
                outline
              ></v-text-field>
              <h3>社会性：</h3>
              <v-text-field
                label="どんな新しい社会が実現できるか"
                outline
              ></v-text-field>
              <h3>経済合理性：</h3>
              <v-text-field
                label="どうやって収益化するか"
                outline
              ></v-text-field>
              </v-flex>
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
