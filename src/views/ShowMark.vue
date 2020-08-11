<template>
  <v-container class="c-container">
    <v-card
      class="mx-auto fullcard"
      :loading="loading"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="previewUrl"
      >
        <v-card-title> {{ data.title }} </v-card-title>
      </v-img>
      <div class="d-flex justify-space-between">
        <v-card-subtitle class="pb-0">10 ноября в 10:00 </v-card-subtitle>
        <v-card-subtitle class="pb-0"> Участников: n </v-card-subtitle>
      </div>

      <v-card-text class="text--primary">

        <div> {{ data.description }} </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
          @click="go"
        >
          Принять участие
        </v-btn>

        <v-btn
          color="orange"
          text
          @click="$router.push({ name: 'home' })"
        >
          Закрыть
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'ShowMark',
  data () {
    return {
      data: {},
      title: null,
      previewUrl: null,
      loading: false
    }
  },
  methods: {
    go () {
      //
    }
  },
  async created () {
    this.loading = true
    this.data = await this.$store.dispatch('mark/loadDataById', this.$route.params.id)
    this.previewUrl = await firebase.storage().ref('marks/' + this.$route.params.id).getDownloadURL()
    this.loading = false
    if (!this.data) this.$router.push({ name: 'home' })
  }
}
</script>

<style lang="sass" scoped>
  .modal
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: white
    color: black

  .fullcard
    height: 100%
    display: flex
    flex-direction: column

</style>
