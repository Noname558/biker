<template>
  <v-container
    class="c-container fill-height"
    fluid
  >
      <yandex-map
        ymap-class="maps"
        :coords="coords"
        zoom=5
        @contextmenu.prevent="createMark"
      >
        <ymap-marker
          v-for="(mark, i) of marks"
          :key="i"
          cluster-name="test"
          :marker-id="mark.id"
          :coords="mark.coords"
          marker-type="placemark"
          :icon="mark.markerIcon"
          @click="$router.push({ 'name': 'ShowMark', params: { id: mark.id } })"
        />
        <ymap-marker
          v-if="tempCoords"
          :coords="tempCoords"
          marker-id="temp_mark"
          hint-content="some hint"
        />
      </yandex-map>
    <v-bottom-navigation
      v-if="tempCoords"
      class="action-list"
    >
      <v-btn value="favorites">
        <span> Сохранить место </span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn
        value="nearby"
        @click="submitCreateMark"
      >
        <span> Создать метку </span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
      <v-btn value="favorites" @click="tempCoords = null">
        <span> Отменить </span>
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </v-bottom-navigation>

    <Modal
      v-if="showModal"
      title="Мероприятие"
      @close="showModal = false"
    >
    </Modal>
  </v-container>
</template>

<script>
import Modal from '../components/Modal'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: 'Home',
  components: { yandexMap, ymapMarker, Modal },
  data () {
    return {
      showModal: false,
      settings: {
        apiKey: '78ede7ec-61a0-4f93-980d-942a5e49ae3c',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      },
      coords: [
        54.82896654088406,
        39.831893822753904
      ],
      tempCoords: null
    }
  },
  computed: {
    marks () {
      return this.$store.state.mark.data
    }
  },
  methods: {
    createMark (e) {
      this.tempCoords = e.get('coords')
      this.showActionList = true
    },
    submitCreateMark () {
      this.$router.push({ name: 'CreateMrk', params: { latitude: this.tempCoords[0], longitude: this.tempCoords[1] } })
    },
    openMark (event) {
      this.showModal = true
      console.log(event)
    },
    balloonTemplate (i) {
      return `
        <h2>${this.marks[i].markerIcon.content}</h2>
        <p> ${this.marks[i].coords.join(', ')} </p>
        <img src="http://via.placeholder.com/350x150">
      `
    },
    getMarkHTML () {
      return '<div class="mark"> $[properties.iconContent] </div>'
    }
  },
  async created () {
    await this.$store.dispatch('mark/loadData')
    console.log(this.$store.state.mark.data)
  }
}
</script>

<style lang="sass">

ul
  display: flex
  list-style: none
  padding: 0
  margin: 0

  li
    margin-left: 1rem
    &:first-child
      margin-left: 0

.maps
  width: 100vw
  height: 93vh

.mark
  font-size: 1rem
  background: red
  width: 110px
  color: #FFFFFF
  font-weight: bold
  /*background-color: #0d47a1*/

.action-list
  position: absolute
  bottom: 0
  left: 0
  right: 0
  color: black
  background: #f5f5f5

ymaps.ymaps-2-1-76-map-copyrights-promo
  display: none
</style>
