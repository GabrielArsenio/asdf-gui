<template>
  <v-app>
    <v-app-bar app dense>
      <v-btn icon small class="mr-1" @click="refresh()" disabled>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-text-field
        v-model="path"
        placeholder="Informe o caminho"
        filled
        rounded
        dense
        hide-details
        disabled
      ></v-text-field>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="6">
            <plugin-list v-model="selectedPlugin"></plugin-list>
          </v-col>
          <v-col cols="6">
            <version-list v-model="selectedPlugin"></version-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PluginList from './components/PluginList.vue'
import VersionList from './components/VersionList.vue'

export default {
  name: "App",
  components: {
    PluginList,
    VersionList
  },
  data () {
    return {
      path: process.env.HOME,
      selectedPlugin: null
    }
  }
}
</script>