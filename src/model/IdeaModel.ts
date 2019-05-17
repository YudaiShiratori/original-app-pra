import firebase from 'firebase/app'
import FirestoreBase from './FirestoreBase'

class IdeaModel extends FirestoreBase {

  uid: string = ''
  title: string = ''
  contentMain: string = ''
  contentBusinessPoint: string = ''
  contentSocialPoint: string = ''
  contentInnovationPoint1: string = ''
  contentInnovationPoint2: string = ''
  contentInnovationPoint3: string = ''
  // ideas: any[] = []
  // db: firebase.firestore.Firestore
  // collection: firebase.firestore.CollectionReference

  image?: StorageFile

  constructor(collectionName: string = 'ideas', id: string | null = null, data: any | null = null) {
    super(collectionName, id, data)

    // this.db = firebase.firestore()
    // this.collectionRef = this.db.collection('ideas')
    // if (id !== undefined && id !== null) {
    //   this.uid = id;
    // } else {
    //   this.uid = this.collection.doc().id;
    // }

    if (data !== null && id !== null) {
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

  async save() {
    await this.collectionRef.doc(this.uid).set({
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

  async get(id: string) {
    await this.collectionRef.doc(this.uid).get();
  }



  async uploadFile(file: File, filename: string = 'filename') {
    try {
      const storagePath: string = `${this.path}/${this.uid}/${filename}`
      const ref = this.storage.ref().child(storagePath)
      // const uploadMetadata: firebase.storage.UploadMetadata = {
      //   contentType: 'image/jpeg',
      // }
      const result = await ref.put(file)
      const downloadUrl = await ref.getDownloadURL()
      const meta = result.metadata
      console.log(result, meta)
      this.image = {
        name: filename,
        url: downloadUrl,
        fileType: meta.contentType !== null && meta.contentType !== undefined ? meta.contentType : '',
      }
      await this.save()
    } catch (error) {
      throw error
    }
  }
}

export default IdeaModel;
