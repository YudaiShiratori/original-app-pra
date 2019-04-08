<template>
  <div class="navbar">
      <!-- ナビゲーションバー https://vuetifyjs.com/en/components/navigation-drawers#navigation-drawer -->
    <v-navigation-drawer
      fixed
      clipped
      app
      dark
      v-model="isDrawer"
      class="lighten-3"
      style="width: 220px;">
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
      fixed
      clipped-left
      app>
      <v-toolbar-side-icon @click.stop="isDrawer = !isDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Navbar'
})
export default class Navbar extends Vue {

  toolbarTitle: string = '僕らのビジネスアイデア'
  isDrawer: boolean = false
  menuList: { label: string, to: string }[] = [
    {
      label: 'ログイン',
      to: 'Login',
    },
    {
      label: 'みんなのアイデア',
      to: 'Home',
    },
    {
      label: 'アイデア投稿',
      to: 'NewIdea',
    },
  ];

  onClickNavigationItem( menu: any ) {
    this.$router.push({ name: menu.to })
  }
  
}
</script>

<style lang="stylus">
.v-toolbar
  background #222
</style>