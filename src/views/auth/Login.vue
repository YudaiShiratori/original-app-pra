<template>
  <div class="container">
    <v-flex class="container__body">
      <v-flex xs12 sm6 offset-sm3>
        <div>
          <img 
            :src='TwitterURL'
            @click="TwitterLogin()"
            :loading="isLoading"
            :diabled="isLoading"
            width="50px"
            style="margin: 10px;"
            />
          <img 
            :src='FacebookURL'
            @click="FacebookLogin()"
            :loading="isLoading"
            :diabled="isLoading"
            width="50px"
            style="margin: 10px;"
            />
        </div>
        <div>
          <v-btn @click="LoginMode()">
            <span>ログイン</span>
          </v-btn>
          <v-btn @click="SigninMode()">
            <span>新規登録</span>
          </v-btn>
        </div>
       <v-card class="container" v-if="LoginOrSigninMode == true" style='margin-top: 2em;'>
          <h3>ログイン</h3>
          <v-text-field
            v-model="loginEmail"
            type="text"
            required
            label="メールアドレス"
            placeholder=""/>
          <v-text-field
            v-model="loginPassword"
            label="パスワード（6文字以上）"
            min="6"
            maxlength="32"
            :append-icon ="isLoginShowPassword ? 'visibility' : 'visibility_off'"
            @click:append="() => (isLoginShowPassword = !isLoginShowPassword)"
            :type="isLoginShowPassword ? 'text' : 'password'"
            required
            placeholder=""
            pattern="[a-zA-Z0-9]*"/>
          <v-flex>
            <v-btn
              color="blue"
              class="white--text"
              :loading="isLoading"
              :disabled="isLoading"
              @click="onLogin">ログイン</v-btn>
          </v-flex>
        </v-card>
        <!-- アカウント作成フォーム -->
        <v-card class="container" v-if="LoginOrSigninMode == false">     
          <v-flex style="margin: 30px 0px;">
            <h3>アカウント作成</h3>
            <v-text-field
              v-model="signupEmail"
              label="メールアドレス"
              type="text"
              required
              placeholder=""/>
            <v-text-field
              v-model="signupPassword"
              label="パスワード（6文字以上）"
              min="6"
              counter="6"
              maxlength="32"
              :append-icon ="isSignupShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="() => (isSignupShowPassword = !isSignupShowPassword)"
              :type="isSignupShowPassword ? 'text' : 'password'"
              required
              pattern="[a-zA-Z0-9]*"/>
            <v-text-field
              v-model="signupConfirmPassword"
              label="確認用パスワード（６文字以上）"
              min="6"
              counter="6"
              maxlength="32"
              :append-icon ="isSignupShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="() => (isSignupShowPassword = !isSignupShowPassword)"
              :type="isSignupShowPassword ? 'text' : 'password'"
              required
              pattern="[a-zA-Z0-9]*"/>
            <v-flex>
              <v-btn
                color="blue"
                class="white--text"
                :loading="isLoading"
                :disabled="isLoading"
                @click="onSignup">サインアップ</v-btn>
            </v-flex>
          </v-flex>
        </v-card>
        <!-- <v-bottom-nav> -->
          
        <!-- </v-bottom-nav> -->
       </v-flex>
    </v-flex>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'
@Component({
  name: 'Login'
})
export default class Login extends Vue {

  isLoading: boolean = false
  isLoginStatus: boolean | null = null

  signupEmail: string = ''
  signupPassword: string = ''
  signupConfirmPassword: string = ''
  signupResultMessage: string = ''
  isSignupShowPassword: boolean = false

  loginEmail: string = ''
  loginPassword: string = ''
  loginResultMessage: string = ''
  isLoginShowPassword: boolean = false

  LoginOrSigninMode: boolean = true

  TwitterURL: string = '@/assets/Twitter_icon.png'
  FacebookURL: string = '@/assets/Facebook_icon.png'

 
  mounted () {
    this.getItems()
  }

  getItems() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.isLoginStatus = true
      } else {
        this.isLoginStatus = false
      }
    })
  }

  async onSignup() {
    this.isLoading = true
    await this.signup()
    this.isLoading = false
  }

  async signup() {
    try {
      this.signupResultMessage = ''
      const messages = this.validationSignup()
      if (messages.length !== 0) {
        messages.forEach((item) => {
          this.signupResultMessage += item + '<br>'
        })
        return 
      }
      const result = await firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
      const user = firebase.auth().currentUser
      if (user !== null) {
        await user.sendEmailVerification()
        await this.createUser(user.uid)
        this.signupResultMessage = '完了メールを送信しました。'
      }
      this.$router.push({ name: 'Home' })
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(userId: string) {
    try {
      const db: firebase.firestore.Firestore = firebase.firestore()
      const batch: firebase.firestore.WriteBatch = db.batch()
      const ref: firebase.firestore.DocumentReference = db.collection('users').doc(userId)
      batch.set(ref, {
        uid: userId,
        created: new Date(),
        updated: new Date(),
        name: 'ゲスト'
      }, { merge: true })
      await batch.commit()
    } catch (error) {
      console.error
    }
  }

  validationSignup(): string[] {
    const messages: string[] = []
    if (this.signupPassword.length < 6) {
      messages.push('パスワードは6文字以上です')
    } else if (this.signupPassword !== this.signupConfirmPassword) {
      messages.push('確認用パスワードが一致しません')
    }
    return messages
  }

  async onLogin() {
    this.isLoading = true
    await this.login()
    this.isLoading = false
  }

  async login() {
    try {
      this.loginResultMessage = ''
      const result = await firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      const user = firebase.auth().currentUser
      if ( user !== null ) {
        await this.updateUser(user.uid)
      }
      this.$router.push({ name: 'Home'})
    } catch(error) {
      console.error(error)
    }
  }

  async updateUser(userId: string) {
    try {
      const db: firebase.firestore.Firestore = firebase.firestore()
      const batch: firebase.firestore.WriteBatch = db.batch()
      const ref: firebase.firestore.DocumentReference = db.collection('users').doc(userId)
      const item = await ref.get()
      if (item.exists) {
        batch.set(ref, {
          updatedAt: new Date
        }, { merge: true })
        await batch.commit()
      } else {
        throw new Error('ユーザ情報がありません、別のアカウントでログインしてください')
      }
    } catch (error) {
      throw error
    }
  }
  
  async signOut() {
    try {
      const result = firebase.auth().signOut()
      this.isLoginStatus = false
    } catch(error) {
      console.error(error)
    }
  }

  LoginMode() {
    this.LoginOrSigninMode = true
  }

  SigninMode() {
    this.LoginOrSigninMode = false
  }

  async TwitterLogin() {
    try {
      this.isLoading = true
      const provider = new firebase.auth.TwitterAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider)
      console.log(result)
      const user = firebase.auth().currentUser
      if (user !== null) {
        console.log('user', user.uid)
      }
      this.$router.push({ name: 'Home' })
    } catch (error) {
      console.error(error)
    }
  }

  async FacebookLogin() {
    try {
      this.isLoading = true
      const provider = new firebase.auth.FacebookAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider)
      console.log(result)
      const user = firebase.auth().currentUser
      if (user !== null) {
        console.log('user', user.uid)
      }
      this.$router.push({ name: 'Home' })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="stylus">
.social
  text-transform none
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat).twitter
  background-color #00aced
</style>