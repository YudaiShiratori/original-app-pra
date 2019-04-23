import firebase from 'firebase/app'

class FirestoreBase {
  db: firebase.firestore.Firestore
  batch: firebase.firestore.WriteBatch
  constructor(id: string | null = null,  data: any | null = null) {
    this.db = firebase.firestore()
    this.batch = this.db.batch()
  }
}

export { FirestoreBase }
