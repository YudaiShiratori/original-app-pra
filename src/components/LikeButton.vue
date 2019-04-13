<template>
  <div class="like-button">
    <div style="padding: 50px;">
      <div v-if="isLiked">
        <h2>いいね!済み</h2>
        <img 
          src="@/assets/liked.png"
          @click="deleteLike()"
          :loading="isLoading"
          height="60px"/>
      </div>
      <div v-else>
        <h2>いいね！ボタン</h2>
        <img 
        src="@/assets/like.png"
        @click="registerLike()"
        :loading="isLoading"
        :disabled="isLoading"
        height="60px"/>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import firebase from 'firebase/app'
@Component({
  name: 'LikeButton'
})
export default class LikeButton extends Vue {
  
  isLoading: boolean = false
  likeList: any[] = []
  isLiked: boolean = false

  count() {
    return this.likeList.length
  }

  registerLike() {
    this.isLiked = true
    // this.transactionFirestore(this.)
  }

  deleteLike() {
    this.isLiked = false
  }

  async transactionFirestore(item: any): Promise<any> {
    let result: any
    try {
      const db: firebase.firestore.Firestore = firebase.firestore()
      return db.runTransaction(async (tr: firebase.firestore.Transaction) => {
        const collection: firebase.firestore.CollectionReference = db.collection('users/{userId}/liked')
        const ref: firebase.firestore.DocumentReference = collection.doc(item.uid)
        const doc = await tr.get(ref)
        // if (doc.exists) {
          
        // } else {
          
        // }
      })
    } catch (error) {
      console.error(error)
      return result
    }
  }


}
</script>

<style lang="stylus">
</style>