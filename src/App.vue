<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
    </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase/app'
import GuestLayout from '@/layout/GuestLayout'
import UserLayout from '@/layout/UserLayout'
export default {
  name: 'App',
  components: {
    GuestLayout, UserLayout
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    layout () {
      return this.$route.meta.layout || 'GuestLayout'
    }
  },
  async created () {
    this.$vuetify.theme.dark = true
    await this.$store.dispatch('user/loadData')
    // let user = await firebase.database().ref('users').child(localStorage.autId).once('value')
    // console.log(user.val())
    // await firebase.database().ref('users').child(localStorage.autId).update({
    //   password: '123321'
    // })
    // user = await firebase.database().ref('users').child(localStorage.autId).once('value')
    // console.log(user.val())
  }
}
</script>

<style lang="sass">
@import "~normalize.css"
body
  font-family: Monospaced, sans-serif
.c-container
  height: 100%
  padding: 0 !important
.container
  padding: 0 !important
.v-main__wrap
  height: calc(100vh - 56px)

  @media screen and (min-width: 960px)
    height: calc(100vh - 64px)
</style>
