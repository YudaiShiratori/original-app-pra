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
