<template>
  <div class="welcome">
    <div class="content">
      <h1> Карта велосипедиста </h1>
      <router-link
        v-if="showModal"
        class="start"
        to="/home"
      >
        Войти гостем в клуб
      </router-link>
          <a class="start" v-if="showModal" @click="showModal = !showModal"> Войти как участник </a>
            <v-card v-if="!showModal" width="400" class="mx-auto mt-5 color" >
              <v-card-title>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login"
                    label="Username"
                    prepend-icon="mdi-account-circle"
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    prepend-icon="mdi-lock"
                    append-icon="mdi-eye-off"
                    @click:append="showPassword=!showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn @click="getName" color="info"> Войти </v-btn>
                <v-btn @click="showModal=!showModal" color="red"> Закрыть </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </div>
    </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      showModal: true,
      showPassword: false,
      login: '',
      password: ''
    }
  },
  methods: {
    getName () {
      console.log(this.login)
      console.log(this.password)
    }
  }
}
</script>
<style lang="sass" scoped>
.welcome
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh
  background-image: url(../assets/bg.jpeg)
  background-repeat: no-repeat
  background-size: cover
  &:before
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    content: ''
    background-color: black
    z-index: 0
    opacity: 0.5
h1
  display: flex
  justify-content: center
  text-shadow: 5px 5px 20px black
  letter-spacing: 2px
  color: #fff
.start
  text-decoration: none
  cursor: pointer
  margin: .5rem auto
  color: #fff
  background-color: #000000
  padding: 0.7rem
  border: none
  border-radius: 0.7rem
  opacity: 0.8
  &:focus
    outline: none
.login
  text-decoration: none
  cursor: pointer
  margin:  auto
  color: #fff
  background-color: #000000
  padding: 0.10rem
  border: none
  border-radius: 0.7rem
  opacity: 0.8
  &:focus
    outline: none
.color
  background-color: rgba(0, 0, 0, 0.68)

.content
  display: flex
  flex-direction: column
  z-index: 1
</style>
