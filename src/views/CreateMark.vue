<template>
  <v-container class="c-container">
    <v-card
      :loading="loading"
      class="mx-auto fill-height d-flex justify-space-between flex-column"
    >
      <v-img
        class="white--text align-end"
        height="50vh"
        :src="previewUrl"
      >
        <v-card-title class="d-flex justify-end">
          <upload-btn
            :disabled="loading"
            color="none"
            icon
            :ripple="false"
            @file-update="upload">
            <template slot="icon">
              <v-icon> mdi-camera </v-icon>
            </template>
          </upload-btn>
        </v-card-title>
      </v-img>
      <v-card class="pa-2 fill-height">
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider v-slot="{ errors }" name="Название" rules="required|max:15">
              <v-text-field
                v-model="title"
                :counter="15"
                :error-messages="errors"
                label="Название"
                required
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Описание" rules="min:10">
              <v-text-field
                v-model="description"
                :error-messages="errors"
                label="Описание"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Ширина, Долгота">
              <v-text-field
                disabled
                v-model="ll"
                :error-messages="errors"
                label="Новый пароль"
              ></v-text-field>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </v-card>
      <v-card-actions>
        <v-btn
          :disabled="!loadPreview || !title || !description"
          color="orange"
          text
          :loading="saveData"
          @click="submit"
        >
          Создать
        </v-btn>
        <v-btn
          color="orange"
          text
          @click="$router.push({name: 'home'})"
        >
          Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { required, max, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import UploadButton from 'vuetify-upload-button'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} пустой'
})

extend('max', {
  ...max,
  message: '{_field_} должен быть не больше {length} символов'
})

extend('min', {
  ...min,
  message: '{_field_} должен быть не меньше {length} символов'
})

export default {
  name: 'CreateMark',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    'upload-btn': UploadButton
  },
  data: () => ({
    loadPreview: false, // загружена ли картинка
    markId: null,
    isSaveMark: false,
    saveData: false,
    loading: false,
    title: '',
    description: '',
    previewUrl: ''
  }),
  computed: {
    ll () {
      return `${this.$route.params.latitude}, ${this.$route.params.longitude}`
    }
  },
  async created () {
    this.markId = (await this.$store.dispatch('mark/create', { temp: true })).key
  },
  async beforeDestroy () {
    if (!this.isSaveMark) {
      await this.$store.dispatch('mark/delete', this.markId)
    }
  },
  methods: {
    async upload (file) {
      this.loading = true
      await firebase.storage().ref('marks/' + this.markId).put(file)
      this.previewUrl = await firebase.storage().ref('marks/' + this.markId).getDownloadURL()
      this.loading = false
      this.loadPreview = true
    },
    async submit () {
      this.$refs.observer.validate()
      this.saveData = true
      const fields = {
        title: this.title,
        description: this.description,
        latitude: this.$route.params.latitude,
        longitude: this.$route.params.longitude,
        temp: null
      }
      await this.$store.dispatch('mark/update', { markId: this.markId, fields })
      this.saveData = false
      this.isSaveMark = true
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>

<style scoped>

</style>
