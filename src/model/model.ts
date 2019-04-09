import firebase from 'firebase/app'

class FirestoreBase {
  db: firebase.firestore.Firestore
  batch: firebase.firestore.WriteBatch
  constructor() {
    this.db = firebase.firestore()
    this.batch = this.db.batch()
  }
  public static getPath(modelName: string) {
    return '${modelName}'
  }
}