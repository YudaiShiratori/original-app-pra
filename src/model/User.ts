import firebase from 'firebase/app'
import FirestoreBase from './FirestoreBase'

export class User extends FirestoreBase {

  constructor(collectionName: string = 'users', id?: string, data?: any) {
    super(collectionName, id, data)

    if (id !== null && data !== undefined) {
      this.createdAt = 'createdAt' in data ? data.createdAt : undefined
      this.updatedAt = 'updatedAt' in data ? data.updatedAt : undefined
    }
  }

  async save() {
    await this.collectionRef.doc(this.uid).set({
      uid: this.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });
  }
}
