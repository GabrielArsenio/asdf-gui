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
        disabled
      ></v-text-field>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card>
              <v-card-title>Plugins</v-card-title>
              
              <v-list two-line>
                <v-list-item v-for="plugin in pluginList" :key="plugin.name" @click="loadInstalledVersionList(plugin.name); loadAvailableVersionList(plugin.name)">
                  <v-list-item-content>
                    <v-list-item-title v-text="plugin.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="plugin.version"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-card-title>Versões</v-card-title>

              <v-list two-line>
                <v-subheader>Instaladas</v-subheader>
                <v-list-item v-for="version in installedVersionList" :key="version" @click="">
                  <v-list-item-content>
                    <v-list-item-title v-text="version"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-earth</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-subheader>Disponíveis</v-subheader>
                <v-list-item v-for="version in availableVersionList" :key="version" @click="">
                  <v-list-item-content>
                    <v-list-item-title v-text="version"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </v-list-item-action>
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
import { pluginList, list, listAll } from './services/asdf.service'

export default {
  name: "App",
  data () {
    return {
      path: process.env.HOME,
      pluginList: [],
      installedVersionList: [],
      availableVersionList: []
    }
  },
  methods: {
    refresh () {
      this.loadPluginList()
    },
    async loadPluginList () {
      this.pluginList = await pluginList(this.path)
    },
    async loadInstalledVersionList (pluginName) {
      this.installedVersionList = await list(pluginName)
    },
    async loadAvailableVersionList (pluginName) {
      this.availableVersionList = await listAll(pluginName)
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>