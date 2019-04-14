import firebase from 'firebase/app'

class FirestoreBase {
  db: firebase.firestore.Firestore
  batch: firebase.firestore.WriteBatch
  constructor() {
    this.db = firebase.firestore()
    this.batch = this.db.batch()
  }
}

// tslint:disable-next-line:max-classes-per-file
class Ideas extends FirestoreBase {

  uid: string = ''
  name: string = ''
  ideas: any[] = []
  title: string = ''
  contentMain: string = ''
  feedback: string = ''
  contentBusinessPoint: string = ''
  contentSocialPoint: string = ''
  contentInnovationPoint1: string = ''
  contentInnovationPoint2: string = ''
  contentInnovationPoint3: string = ''

  constructor() {
    super()
  }

  async saveIdea() {
    try {
      const collection: firebase.firestore.CollectionReference = this.db.collection('ideas')
      this.uid = collection.doc().id
      const itemRef: firebase.firestore.DocumentReference = collection.doc(this.uid)
      this.batch.set(itemRef, {
        title: this.title,
        contentMain: this.contentMain,
        contentSocialPoint: this.contentSocialPoint,
        contentBusinessPoint: this.contentBusinessPoint,
        contentInnovationPoint1: this.contentInnovationPoint1,
        contentInnovationPoint2: this.contentInnovationPoint2,
        contentInnovationPoint3: this.contentInnovationPoint3,
      })
      await this.batch.commit()
    } catch (error) {
      console.error('firebase error', error)
    }
  }

  async getIdea() {
    try {
      this.ideas = []
      const items: firebase.firestore.QuerySnapshot = await this.db.collection('ideas').get()
      items.docs.forEach((item: firebase.firestore.QueryDocumentSnapshot) => {
        const idea = item.data()
        idea.id = item.id
        idea.title = idea.title.replace(/\n/g, '<br>')
        this.ideas.push(idea)
      })
      console.log(this.ideas)
    } catch (error) {
      console.error('firebase error', error)
    }
  }
}

class User extends FirestoreBase {

  signupEmail: string = ''
  signupPassword: string = ''
  signupConfirmPassword: string = ''
  signupResultMessage: string = ''
  isSignupShowPassword: boolean = false

  loginEmail: string = ''
  loginPassword: string = ''
  loginResultMessage: string = ''
  isLoginShowPassword: boolean = false

  constructor() {
    super()
  }

  async signup() {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
      const user = firebase.auth().currentUser
      if (user !== null) {
        await user.sendEmailVerification()
        await this.createUser(user.uid)
        this.signupResultMessage = '完了メールを送信しました。'
      }
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(userId: string) {
    try {
      const ref: firebase.firestore.DocumentReference = this.db.collection('users').doc(userId)
      this.batch.set(ref, {
        uid: userId,
        created: new Date(),
        updated: new Date(),
        name: 'ゲスト'
      }, { merge: true })
      await this.batch.commit()
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

  async login() {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
    } catch(error) {
      console.error(error)
    }
  }

  async TwitterLogin() {
    try {
      const provider = new firebase.auth.TwitterAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }
  }

  async FacebookLogin() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }
  }
}