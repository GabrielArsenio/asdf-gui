<template>
  <v-app>
    <v-app-bar app dense>
      <v-btn icon small class="mr-1" @click="refresh()">
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
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Plugins</v-card-title>
              
              <v-list two-line>
                <v-list-item v-for="plugin in pluginList" :key="plugin">
                  <v-list-item-content>
                    <v-list-item-title v-text="plugin"></v-list-item-title>
                    <!-- <v-list-item-subtitle>Versao</v-list-item-subtitle> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { pluginList } from './services/asdf.service'

export default {
  name: "App",
  data () {
    return {
      path: process.env.HOME,
      pluginList: []
    }
  },
  methods: {
    refresh () {
      this.loadPluginList()
    },
    async loadPluginList () {
      this.pluginList = await pluginList(this.path)
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>