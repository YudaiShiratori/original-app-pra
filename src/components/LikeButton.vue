<template>
  <div class="like-button">
    <div>
      <v-btn 
        v-if="isLiked" 
        @click="deleteLike()"
        color="red"
        :loading="isLoading"
        :disabled="isLoading"
        class="white--text">
        いいねを取り消す
      </v-btn>
      <v-btn 
        v-else 
        @click="registerLike()"
        color="black"
        :loading="isLoading"
        :disabled="isLoading"
        class="white--text">
        いいねする
      </v-btn>
      <img src="@/assets/like.png"></img>
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