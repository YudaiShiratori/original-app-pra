// <template>
//   <div class="new-message">
//     <v-flex class="container__body">
//       <p>{{ this.name }}</p>
//       <v-flex xs12 sm6 offset-sm3>
//           <v-form @submit.prevent="addMessage">
//             <v-container>
//               <v-flex xs12 sm6 md3>
//                 <v-text-field
//                   label="newMessage"
//                   placeholder="enter to add:"
//                   style="min-width: 250px;"
//                   outline
//                   v-model="newMessage"
//                 ></v-text-field>
//               </v-flex>
//             </v-container>
//           </v-form>
//       </v-flex>
//     </v-flex>
//   </div>
// </template>

// <script>
// import db from '@/firebase/firebaseConfig'

// export default {
//   name: 'NewMessage',
//   props: ['name'],
//   data() {
//     return {
//       newMessage: null,
//       feedback: null
//     }
//   },
//   methods: {
//     addMessage() {
//       console.log(this.newMessage, this.name, Date.now())
//       if(this.newMessage){
//         db.collection('messages').add({
//           content: this.newMessage,
//           // name: this.name,
//           // timestamp: Date.now()
//         }).catch(err => {
//           console.log(err)
//         })
//         this.newMessage = null
//         this.feedback = null
//       }
//     }
//   }
// }
// </script>
