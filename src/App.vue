<template>
  <v-app>
    <v-app-bar app dense>
      <v-btn icon small class="mr-1">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-text-field
        v-model="path"
        placeholder="Informe o caminho"
        filled
        rounded
        dense
        hide-details
      ></v-text-field>
    </v-app-bar>
    <v-main>
      <v-container>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      path: null,
    }
  },
}
</script>