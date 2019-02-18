<template>
  <div class="view-idea">
    <v-flex class="container__body">
      <v-flex xs12 sm6 offset-sm3>
        <h2>idea</h2>
        <pre>{{ $data }}</pre>
        <!-- <p>{{ id }}</p> -->
        <!-- <Opinion /> -->
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import db from '@/firebase/firebaseConfig'
// import Opinion from '@/components/Opinion'

export default {
  name: 'ViewIdea',
  // component: {
  //   Opinion
  // },
  data() {
    return {
    }
  },
  created() {
    this.id = this.$route.params.id
    db.collection('ideas').where('id', '==', this.$route.params.id)
    .get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id)
        let idea = doc.data()
        this.idea.id = doc.id
      })
    })
  },
}
</script>



<!--


//   <div class="view-idea">
//     <v-flex class="container__body">
//       <pre>{{ $data}}</pre>
//       <!-- <h2>Idea-view {{ ideaId }}</h2> 
//       <v-flex xs12 sm6 offset-sm3>
//         <v-container xs12>
//           <p>aaa</p>
//           <!-- <v-card>
//             <v-card-title>
//               <! <h2>{{ idea.title }}</h2>
//               <p>{{ idea.content }}</p> --
//               <!-- <p>aaaa</p>
//             </v-card-title>
//           </v-card> -
//         </v-container>
//       </v-flex>
//     </v-flex>
//   </div>
// </template>