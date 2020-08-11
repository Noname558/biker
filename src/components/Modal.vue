<template>
    <div class="modal">
      <v-card
        class="mx-auto fullcard"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title> {{ title }} </v-card-title>
        </v-img>
        <div class="d-flex justify-space-between">
          <v-card-subtitle class="pb-0">10 ноября в 10:00 </v-card-subtitle>
          <v-card-subtitle class="pb-0"> Участников: n </v-card-subtitle>
        </div>

        <v-card-text class="text--primary">

          <div> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores at aut culpa dicta dolorem enim et expedita fuga incidunt iste minima minus placeat porro quam quidem saepe, similique veritatis voluptates voluptatum. Architecto cumque ea et ipsam iure laboriosam nihil numquam officiis optio possimus, provident quis quos rerum sequi sit! </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
          >
            Принять участие
          </v-btn>

          <v-btn
            color="orange"
            text
            @click="$emit('close')"
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
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String
  },
  data () {
    return {
      //
    }
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
