<template>
  <div class="navbar">
      <!-- ナビゲーションバー https://vuetifyjs.com/en/components/navigation-drawers#navigation-drawer -->
    <v-navigation-drawer
      fixed
      clipped
      app
      dark
      v-model="isDrawer"
      class="blue lighten-3"
      style="width: 200px;">
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg>
        <v-list>
          <v-layout wrap column>
            <v-flex>
              <template v-for="(menu, index) in menuList">
                <v-list-tile :key="index" @click="onClickNavigationItem(menu)">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ menu.label }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-flex>
          </v-layout>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <!-- ツールバー https://vuetifyjs.com/en/components/toolbars#toolbar -->
    <v-toolbar
      dark
      color="blue"
      fixed
      clipped-left
      app>
      <v-toolbar-side-icon @click.stop="isDrawer = !isDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'Navbar',
  data() {
    return {
      toolbarTitle: '僕らのビジネスアイデア',
      isDrawer: false,
      menuList: [
        {
          label: 'ログイン',
          to: 'Login',
        },
        {
          label: '新規登録',
          to: 'Signup',
        },
        {
          label: 'アイデア投稿',
          to: 'MakeIdea',
        },
      ],
    } 
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    onClickNavigationItem(menu) {
      this.$router.push({name: menu.to})
    },
    // created () {
    //   let user = firebase.auth().currentUser
    // }
  }
}
</script>

<style>

</style>
