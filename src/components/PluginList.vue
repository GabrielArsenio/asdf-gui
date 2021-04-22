<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Plugins</v-toolbar-title>
      <v-spacer></v-spacer>
      <new-plugin @addedPlugin="addPlugin"></new-plugin>
    </v-toolbar>

    <v-row justify="center" v-if="loader">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <v-list two-line>
      <v-list-item-group>
        <v-list-item
          v-for="plugin in pluginList"
          :key="plugin.name"
          @click="$emit('input', plugin)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="plugin.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="plugin.version"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { current } from "../services/asdf.service";
import NewPlugin from "./NewPlugin.vue";

export default {
  components: {
    NewPlugin,
  },
  data() {
    return {
      loader: false,
      pluginList: [],
    };
  },
  methods: {
    async loadPluginList() {
      try {
        this.pluginList = [];
        this.loader = true;
        this.pluginList = await current(this.path);
      } finally {
        this.loader = false;
      }
    },
    addPlugin(pluginName) {
      this.pluginList.unshift({
        name: pluginName,
        version: "______",
      });
    },
  },
  mounted() {
    this.loadPluginList();
  },
};
</script>