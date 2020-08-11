<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="avatarUrl">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title> {{ username }} </v-list-item-title>
            <v-list-item-subtitle> Байкер </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <router-link to="/home">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title> Карта </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/friends">
          <v-list-item link>
            <v-list-item-action>
              <v-icon> mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Друзья </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/like">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Сохраненные места </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </router-link>
        <router-link to="/settings">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Настройки </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/InstallApp">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>  mdi-arrow-down-bold-circle-outline </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Установить приложение </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/exit">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>  mdi-exit-to-app </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Выход </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="orange"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> {{ $route.meta.title }} </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  data: () => ({
    drawer: false
  }),
  computed: {
    username: {
      get () {
        return this.$store.state.user.username
      }
    },
    avatarUrl: {
      get () {
        return this.$store.state.user.avatarUrl
      }
    }
  }
}
</script>

<style lang="sass" scoped>
a
  text-decoration: none
</style>
