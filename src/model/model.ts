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
class IdeaModel extends FirestoreBase {

  uid: string = ''
  ideas: any[] = []
  title: string = ''
  contentMain: string = ''
  contentBusinessPoint: string = ''
  contentSocialPoint: string = ''
  contentInnovationPoint1: string = ''
  contentInnovationPoint2: string = ''
  contentInnovationPoint3: string = ''

  public collection: firebase.firestore.CollectionReference;

  constructor(id?: string, data?: any) {
    super()
    this.collection = this.db.collection('ideas')
    if (id !== undefined && id !== null) {
      this.uid = id;
    } else {
      this.uid = this.collection.doc().id;
    }

    if (data !== undefined && id !== null) {
      this.title = 'title' in data ? data.title : undefined;
      this.contentMain = 'contentMain' in data ? data.contentMain : undefined;
      this.contentBusinessPoint = 'contentBusinessPoint' in data ? data.contentBusinessPoint : undefined;
      this.contentSocialPoint = 'contentSocialPoint' in data ? data.contentSocialPoint : undefined;
      this.contentInnovationPoint1 = 'contentInnovationPoint1' in data ? data.contentInnovationPoint1 : undefined;
      this.contentInnovationPoint2 = 'contentInnovationPoint2' in data ? data.contentInnovationPoint2 : undefined;
      this.contentInnovationPoint3 = 'contentInnovationPoint3' in data ? data.contentInnovationPoint3 : undefined;
      // this.createdAt: Date = 'createdAt' in data ? data.createdAt :undefined;
      // this.updatedAt: Date = 'updatedAt' in data ? data.name : undefined;
    }
  }

  public async save() {
    await this.collection.doc(this.uid).set({
      uid: this.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: this.title,
      contentMain: this.contentMain,
      contentBusinessPoint: this.contentBusinessPoint,
      contentSocialPoint: this.contentSocialPoint,
      contentInnovationPoint1: this.contentInnovationPoint1,
      contentInnovationPoint2: this.contentInnovationPoint2,
      contentInnovationPoint3: this.contentInnovationPoint3,
    }, { merge: true });
  }
  public async get(id: string) {
    await this.collection.doc(id).get();
  }
}

// class User {
  
//   public uid: string;
//   public name: string = '';
//   public age: number = 0;
//   public sex: number = 0;
//   public isPublished: boolean = false;
//   // public createdAt: Date;
//   // public updatedAt: Date;

//   public db: firebase.firestore.Firestore;
//   public collection: firebase.firestore.CollectionReference;


//   constructor(id?: string, data?: any) {
//     this.db = firebase.firestore()
//     this.collection = this.db.collection('users')
//     if (id !== undefined && id !== null) {
//       this.uid = id;
//     } else {
//       this.uid = this.collection.doc().id;
//     }

//     if (data !== undefined && id !== null) {
//       this.name = 'name' in data ? data.name : undefined;
//       this.age = 'age' in data ? data.age : 0;
//       this.sex = 'sex' in data ? data.sex : 0;
//       this.isPublished = 'isPublished' in data ? data.isPublished : false;
//       // this.createdAt = 'createdAt' in data ? data.createdAt :undefined;
//       // this.updatedAt = 'updatedAt' in data ? data.name : undefined;
//     }
//   }

//   public async save() {
//     await this.collection.doc(this.uid).set({
//       uid: this.uid,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       name: this.name,
//       age: Number(this.age),  // v-text-fieldで入力するとString型になるためNumber型へ変換
//       sex: this.sex,
//       isPublished: this.isPublished,
//     }, { merge: true });
//   }
//   public async get(id: string) {
//     await this.collection.doc(id).get();
//   }
// }