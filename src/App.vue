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

                <v-toolbar>
                  <v-toolbar-title>Plugins</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <new-plugin @addedPlugin="addPlugin"></new-plugin>
                </v-toolbar>

                <v-row justify="center" v-if="trackers.pluginList">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>

                <v-list two-line>
                  <v-list-item-group v-model="selectedPlugin">
                    <v-list-item
                      v-for="plugin in pluginList"
                      :key="plugin.name"
                      @click="loadInstalledVersionList(plugin.name);loadAvailableVersionList(plugin.name)">
                      <v-list-item-content>
                        <v-list-item-title v-text="plugin.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="plugin.version"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Versões</v-toolbar-title>
              </v-toolbar>

              <v-list two-line>
                <v-subheader>Instaladas</v-subheader>

                <v-row justify="center" v-if="trackers.installedVersionList">
                  <v-col cols="3">
                    <v-progress-linear
                      indeterminate
                      rounded
                      height="5"
                    ></v-progress-linear>
                  </v-col>
                </v-row>

                <v-list-item v-for="version in installedVersionList" :key="version">
                  <v-list-item-content>
                    <v-list-item-title v-text="version"></v-list-item-title>
                  </v-list-item-content>
                  <v-progress-circular
                    v-if="trackers.setVersion[version]"
                    size="24"
                    width="3"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                  <v-list-item-action v-if="!trackers.setVersion[version]">
                    <v-btn icon @click="set('global', selectedPlugin.name, version)">
                      <v-icon>mdi-earth</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-progress-circular
                    v-if="trackers.uninstallVersion[version]"
                    size="24"
                    width="3"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                  <v-list-item-action v-if="!trackers.uninstallVersion[version]">
                    <v-btn icon @click="uninstall(selectedPlugin.name, version)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-subheader>Disponíveis</v-subheader>

                <v-row justify="center" v-if="trackers.availableVersionList">
                  <v-col cols="3">
                    <v-progress-linear
                      indeterminate
                      rounded
                      height="5"
                    ></v-progress-linear>
                  </v-col>
                </v-row>
                
                <v-list-item v-for="version in availableVersionList" :key="version">
                  <v-list-item-content>
                    <v-list-item-title v-text="version"></v-list-item-title>
                  </v-list-item-content>
                  <v-progress-circular
                    v-if="trackers.installVersion[version]"
                    size="24"
                    width="3"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                  <v-list-item-action v-if="!trackers.installVersion[version]">
                    <v-btn icon @click="install(selectedPlugin.name, version)">
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
import { current, list, listAll, set, install, uninstall } from './services/asdf.service'
import NewPlugin from './components/NewPlugin.vue'

export default {
  name: "App",
  components: {
    NewPlugin
  },
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
        availableVersionList: false,
        setVersion: {},
        installVersion: {},
        uninstallVersion: {}
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
        this.pluginList = await current(this.path)
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
        this.availableVersionList = (await listAll(pluginName)).filter(el => !this.installedVersionList.includes(el))
      } finally {
        this.trackers.availableVersionList = false
      }
    },
    async set(scope, pluginName, version) {
      try {
        this.$set(this.trackers.setVersion, version, true)
        await set(scope, pluginName, version)
        const plugin = this.pluginList.find(plugin => plugin.name === pluginName)
        plugin.version = version
      } finally {
        this.$set(this.trackers.setVersion, version, false)
      }
    },
    async install(pluginName, version) {
      try {
        this.$set(this.trackers.installVersion, version, true)
        await install(pluginName, version)
        this.availableVersionList = this.availableVersionList.filter(v => v !== version)
        this.installedVersionList.push(version)
      } finally {
        this.$set(this.trackers.installVersion, version, false)
      }
    },
    async uninstall(pluginName, version) {
      try {
        this.$set(this.trackers.uninstallVersion, version, true)
        await uninstall(pluginName, version)
        this.installedVersionList = this.installedVersionList.filter(v => v !== version)
        this.availableVersionList.unshift(version)
      } finally {
        this.$set(this.trackers.uninstallVersion, version, false)
      }
    },
    addPlugin (pluginName) {
      this.pluginList.unshift({
        name: pluginName,
        version: '______'
      })
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>