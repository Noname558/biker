<template>
  <v-container class="c-container">
    <v-card
      class="mx-auto pa-4"
    >
      Наш сервис использует технологию PWA, которая позволяет нашему сайту работать как приложение на вашем Android / IOS устройстве
    </v-card>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header> Android </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, quasi? </p>
          <v-img src="../assets/bg.jpeg" alt="" width="100%" max-width="600px" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header> IOS </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: 'InstallApp'
}
</script>

<style scoped>

</style>
