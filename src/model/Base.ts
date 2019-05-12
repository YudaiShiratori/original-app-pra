import firebase from 'firebase/app'
import 'firebase/storage'

export class Base {
  uid: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp

  isLoading: boolean = false

  path: string
  collectionName: string
  db: firebase.firestore.Firestore
  collectionRef: firebase.firestore.CollectionReference
  documentRef: firebase.firestore.DocumentReference
  storage: firebase.firestore.Storage

  constructor(collectionName: string, id: string | null = null) {
    this.db = firebase.firestore()
    this.collectionName = collectionName
    this.collectionRef = this.db.collection(this.collectionName)
    this.storage = firebase.storage()
    if (id !== null) {
      this.uid = id
    } else {
      this.uid = this.collectionRef.doc().id
    }
    this.documentRef = this.collectionRef.doc(this.uid)
  }

  asnyc get() {
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

  protected pack(isupdate: boolean = false): any {
    const item: any = {}
    const date = firebase.firestore.Timestamp.fromDate(new Date())
    if (isUpdate) {
      this.UpdateAt = date
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
