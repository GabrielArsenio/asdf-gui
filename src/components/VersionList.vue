<template>
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
          <v-btn icon @click="set('global', value.name, version)">
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
          <v-btn icon @click="uninstall(value.name, version)">
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
          <v-btn icon @click="install(value.name, version)">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import {
  list,
  listAll,
  set,
  install,
  uninstall,
} from "../services/asdf.service";

export default {
  props: ["value"],
  data() {
    return {
      installedVersionList: [],
      availableVersionList: [],
      trackers: {
        installedVersionList: false,
        availableVersionList: false,
        setVersion: {},
        installVersion: {},
        uninstallVersion: {},
      },
    };
  },
  watch: {
    value(selectedPlugin) {
      this.loadInstalledVersionList(selectedPlugin.name);
      this.loadAvailableVersionList(selectedPlugin.name);
    },
  },
  methods: {
    refresh() {
      this.installedVersionList = [];
      this.availableVersionList = [];
    },
    async loadInstalledVersionList(pluginName) {
      try {
        this.installedVersionList = [];
        this.trackers.installedVersionList = true;
        this.installedVersionList = await list(pluginName);
      } finally {
        this.trackers.installedVersionList = false;
      }
    },
    async loadAvailableVersionList(pluginName) {
      try {
        this.availableVersionList = [];
        this.trackers.availableVersionList = true;
        this.availableVersionList = (await listAll(pluginName)).filter(
          (el) => !this.installedVersionList.includes(el)
        );
      } finally {
        this.trackers.availableVersionList = false;
      }
    },
    async set(scope, pluginName, version) {
      try {
        this.$set(this.trackers.setVersion, version, true);
        await set(scope, pluginName, version);
        this.value.version = version;
      } finally {
        this.$set(this.trackers.setVersion, version, false);
      }
    },
    async install(pluginName, version) {
      try {
        this.$set(this.trackers.installVersion, version, true);
        await install(pluginName, version);
        this.availableVersionList = this.availableVersionList.filter(
          (v) => v !== version
        );
        this.installedVersionList.push(version);
      } finally {
        this.$set(this.trackers.installVersion, version, false);
      }
    },
    async uninstall(pluginName, version) {
      try {
        this.$set(this.trackers.uninstallVersion, version, true);
        await uninstall(pluginName, version);
        this.installedVersionList = this.installedVersionList.filter(
          (v) => v !== version
        );
        this.availableVersionList.unshift(version);
      } finally {
        this.$set(this.trackers.uninstallVersion, version, false);
      }
    },
  },
};
</script>