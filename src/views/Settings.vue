<template>
  <v-container class="c-container">
    <v-card
      :loading="loading"
      class="mx-auto fill-height d-flex justify-space-between flex-column"
    >
      <v-img
        class="white--text align-end"
        height="50vh"
        :src="avatarUrl"
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
          <ValidationProvider v-slot="{ errors }" name="Никнейм" rules="required|max:20">
            <v-text-field
              v-model="username"
              :counter="20"
              :error-messages="errors"
              label="Никнейм"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Email" rules="email">
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Пароль" rules="min:3">
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Новый пароль"
            ></v-text-field>
          </ValidationProvider>
        </form>
      </ValidationObserver>
      </v-card>
      <v-card-actions>
        <v-btn
          color="orange"
          text
          :loading="saveData"
          @click="submit"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { required, email, max, min } from 'vee-validate/dist/rules'
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

extend('email', {
  ...email,
  message: 'Невалидный Email'
})

export default {
  name: 'Settings',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    'upload-btn': UploadButton
  },
  computed: {
    username: {
      get () {
        return this.$store.state.user.username
      },
      set (value) {
        this.$store.commit('user/setUsername', value)
      }
    },
    email: {
      get () {
        return this.$store.state.user.email
      },
      set (value) {
        this.$store.commit('user/setEmail', value)
      }
    },
    avatarUrl: {
      get () {
        return this.$store.state.user.avatarUrl
      },
      set (value) {
        this.$store.commit('user/setAvatarUrl', value)
      }
    }
  },
  data: () => ({
    saveData: false,
    loading: false,
    password: ''
  }),
  created () {
    //
  },
  methods: {
    async upload (file) {
      this.loading = true
      await firebase.storage().ref('avatars/' + localStorage.autId).put(file)
      this.avatarUrl = await firebase.storage().ref('avatars/' + localStorage.autId).getDownloadURL()
      this.loading = false
    },
    async submit () {
      this.$refs.observer.validate()
      this.saveData = true
      const fields = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('user/updateData', fields)
      this.password = ''
      this.saveData = false
    }
  }
}

</script>

<style scoped>

</style>
