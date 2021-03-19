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

                <v-row justify="center" v-if="trackers.pluginList">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>

                <v-list two-line>
                  <v-list-item
                    v-for="plugin in pluginList"
                    :key="plugin.name"
                    @click="loadInstalledVersionList(plugin.name);loadAvailableVersionList(plugin.name);selectedPlugin=plugin">
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

                <v-row justify="center" v-if="trackers.installedVersionList">
                  <v-col cols="1">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-col>
                </v-row>

                <v-list-item v-for="version in installedVersionList" :key="version">
                  <v-list-item-content>
                    <v-list-item-title v-text="version"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="set('global', selectedPlugin.name, version)">
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

                <v-row justify="center" v-if="trackers.availableVersionList">
                  <v-col cols="1">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-col>
                </v-row>
                
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
import { pluginList, list, listAll, set } from './services/asdf.service'

export default {
  name: "App",
  data () {
    return {
      path: process.env.HOME,
      selectedPlugin: null,
      pluginList: [],
      installedVersionList: [],
      availableVersionList: [],
      trackers: {
        pluginList: false,
        installedVersionList: false,
        availableVersionList: false
      }
    }
  },
  methods: {
    refresh () {
      this.installedVersionList = []
      this.availableVersionList = []
      this.loadPluginList()
    },
    async loadPluginList () {
      try {
        this.pluginList = []
        this.trackers.pluginList = true
        this.pluginList = await pluginList(this.path)
      } finally {
        this.trackers.pluginList = false
      }
    },
    async loadInstalledVersionList (pluginName) {
      try {
        this.installedVersionList = []
        this.trackers.installedVersionList = true
        this.installedVersionList = await list(pluginName)
      } finally {
        this.trackers.installedVersionList = false
      }
    },
    async loadAvailableVersionList (pluginName) {
      try {
        this.availableVersionList = []
        this.trackers.availableVersionList = true
        this.availableVersionList = await listAll(pluginName)
      } finally {
        this.trackers.availableVersionList = false
      }
    },
    async set(scope, pluginName, version) {
      await set(scope, pluginName, version)
      const plugin = this.pluginList.find(plugin => plugin.name === pluginName)
      plugin.version = version
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>