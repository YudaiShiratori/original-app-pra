import firebase from 'firebase/app'
import 'firebase/storage'

// class FirestoreBase {
//   db: firebase.firestore.Firestore
//   batch: firebase.firestore.WriteBatch
//   constructor(id: string | null = null,  data: any | null = null) {
//     this.db = firebase.firestore()
//     this.batch = this.db.batch()
//   }
// }
// export { FirestoreBase }

export default class FirestoreBase {
  uid: string
  createdAt: firebase.firestore.Timestamp | undefined
  updatedAt: firebase.firestore.Timestamp | undefined

  isLoading: boolean = false

  path: string | undefined
  collectionName: string
  db: firebase.firestore.Firestore
  collectionRef: firebase.firestore.CollectionReference
  documentRef: firebase.firestore.DocumentReference
  batch: firebase.firestore.WriteBatch
  // storage: firebase.firestore.Storage

  constructor(collectionName: string, id: string | null = null, data: any | null = null) {
    this.db = firebase.firestore()
    this.collectionName = collectionName
    this.collectionRef = this.db.collection(this.collectionName)
    this.batch = this.db.batch()
    // this.storage = firebase.storage()
    if (id !== null) {
      this.uid = id
    } else {
      this.uid = this.collectionRef.doc().id
    }
    this.documentRef = this.collectionRef.doc(this.uid)
  }

  async get() {
    try {
      const snapshot: firebase.firestore.DocumentSnapshot = await this.documentRef.get()
      this.setProperty(snapshot)
    } catch (error) {
      throw error
    }
  }

  async delete() {
    try {
      const batch: firebase.firestore.WriteBatch = this.db.batch()
      batch.delete(this.documentRef)
      await batch.commit()
      this.clear()
    } catch (error) {
      throw error
    }
  }

  protected setProperty(snapshot: firebase.firestore.DocumentSnapshot) {
    this.uid = snapshot.id
    if (snapshot.exists) {
      const data = snapshot.data()
      if (data !== undefined) {
        this.createdAt = 'createdAt' in data ? data.createdAt : undefined
        this.updatedAt = 'updatedAt' in data ? data.updatedAt : undefined
        this.isLoading = true
      }
    }
  }

  protected clear() {
    this.createdAt = undefined
    this.updatedAt = undefined
    this.isLoading = false
  }

  protected pack(isUpdate: boolean = false): any {
    const item: any = {}
    const date = firebase.firestore.Timestamp.fromDate(new Date())
    if (isUpdate) {
      this.updatedAt = date
      if (this.updatedAt !== undefined) {
        item.updatedAt = date
      }
    } else {
      this.createdAt = date
      this.updatedAt = date
      if (this.updatedAt !== undefined) {
        item.updatedAt = date
      }
    }
  }
}
