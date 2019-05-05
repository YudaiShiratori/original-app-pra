import firebase from 'firebase/app'
import IdeaModel from './IdeaModel'

class DataSource {
  public async getAllIdea() {
    const ideas: IdeaModel[] = []
    const db = firebase.firestore()
    const items: firebase.firestore.QuerySnapshot = await db.collection('ideas').get()
    items.docs.forEach((item: firebase.firestore.QueryDocumentSnapshot) => {
      if (item.exists) {
        const idea = new IdeaModel(item.id, item.data())
        idea.title = idea.title.replace(/\n/g, '<br>')
        ideas.push(idea)
      }
    })
    console.log('ideas', ideas)
    return ideas
  }
}

export default DataSource;
