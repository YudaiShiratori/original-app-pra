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
  }

  deleteLike() {
    this.isLiked = false
  }


}
</script>

<style lang="stylus">
</style>