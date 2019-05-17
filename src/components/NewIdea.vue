<template>
  <div class="new-idea">
    <v-flex class="container__body">
      <h3>あなたのアイデアで世界を変えよう！</h3>
      <br>
      <v-flex xs12 sm12 class="idea-form">
        <v-form ref="form">
          <v-container xs12 sm12>
            <h2>あなたのアイデア</h2>
            <v-container>
              <v-flex xs12 sm12>
              <v-textarea
                label="コンセプト"
                placeholder="あなたのビジネスを一言で説明してください："
                outline
                v-model="title"
              ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12>
              <v-textarea
                outline
                label="具体的な内容："
                rows="30"
                v-model="contentMain"
              ></v-textarea>
              <h2>ヒント</h2><span>*必ずしも入力せずとも大丈夫です</span>
              <h3>創造性：</h3>
              <h4>逆説の構造</h4>
              <v-textarea
                label="起点"
                outline
                v-model="contentInnovationPoint1"
              ></v-textarea>
              <v-textarea
                label="定説"
                outline
                v-model="contentInnovationPoint2"
              ></v-textarea>
              <v-textarea
                label="逆説"
                outline
                v-model="contentInnovationPoint3"
              ></v-textarea>
              <h3>社会性：</h3>
              <v-textarea
                label="どんな新しい社会が実現できるか"
                outline
                v-model="contentSocialPoint"
              ></v-textarea>
              <h3>経済合理性：</h3>
              <v-textarea
                label="どうやって収益化するか"
                outline
                v-model="contentBusinessPoint"
              ></v-textarea>
              </v-flex>
              <div id="app">
                <h2>画像</h2>
                <img :src="ImageData()" />
                <input type="file" v-on:change="onFileChange()">
              </div>
              <v-flex xs12>
              <p v-if="feedback">{{ feedback }}</p>
              <v-btn
                color="red"
                class="white--text"
                @click.prevent="onRegist">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import IdeaModel from '../model/IdeaModel'
import { FileInfo } from '../ts/interface/FileInfo'

@Component({
  name: 'NewIdea'
})
export default class NewIdea extends Vue {

  title: string = ''
  contentMain: string = ''
  feedback: string = ''
  contentBusinessPoint: string = ''
  contentSocialPoint: string = ''
  contentInnovationPoint1: string = ''
  contentInnovationPoint2: string = ''
  contentInnovationPoint3: string = ''
  isLoading: boolean = false
  // uploadedImage: any = { url: '' }
  // ImagenamePath: string = ''
  // frStorage: firebase.storage.Storage = firebase.storage()
  // newIdeas: any[] = []

  fileInfo: FileInfo = { data: null, file: null, url: null }

  async onRegist() {
    this.isLoading = true
    await this.writeFirestore()
    this.clear()
    this.isLoading = false
    this.$router.push({ name: 'Home'})
  }
  
  async writeFirestore() {
    try {
      const item = new IdeaModel()
      item.title = this.title,
      item.contentMain = this.contentMain,
      item.contentSocialPoint = this.contentSocialPoint,
      item.contentBusinessPoint = this.contentBusinessPoint,
      item.contentInnovationPoint1 = this.contentInnovationPoint1,
      item.contentInnovationPoint2 = this.contentInnovationPoint2,
      item.contentInnovationPoint3 = this.contentInnovationPoint3
      await item.save()
    } catch (error) {
      console.log('firebase error', error)
    }
  }

  clear() {
    this.title = ''
    this.contentMain = ''
    this.contentSocialPoint = ''
    this.contentBusinessPoint = ''
    this.contentInnovationPoint1 = ''
    this.contentInnovationPoint2 = ''
    this.contentInnovationPoint3 = ''
    // this.uploadedImage = { url: '' }
  }
  
  get ImageData() {
    return this.fileInfo.data !== null ? this.fileInfo.data : this.fileInfo.url
  }

  onFileChange(e: Event) {
    const event = (e.target as any) as HTMLInputElement
    const files = event.files
    
    const isCancelEvent = !files || files.length === 0
    if (isCancelEvent) {
      return
    }
    if (files !== null) {
      this.createImage(files[0])
    }
  }

  createImage(file: File) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.fileInfo.data = e.target.result
    }
    reader.readAsDataURL(file)
    this.fileInfo.file = file
  }

  // async upload () {
  //   try {
  //       let path = this.ImagenamePath
  //       let mountainsRef = this.frStorage.ref().child(path)
  //       await mountainsRef.put(this.uploadedImage)
  //       let url = await mountainsRef.getDownloadURL()
  //       console.log('storage upload', url)
  //       return url
  //   } catch (error) {
  //       throw error
  //   }
  // }
}
</script>
<style lang="stylus">
.idea-form
  background white
</style>