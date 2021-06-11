<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Plugins</v-toolbar-title>
      <v-spacer></v-spacer>
      <new-plugin v-model="pluginList"></new-plugin>
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
          <v-list-item-action>
            <v-btn icon @click.stop="pluginRemove(plugin.name)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { current, pluginRemove } from "../services/asdf.service";
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
    async pluginRemove(pluginName) {
      await pluginRemove(pluginName);
      this.pluginList = this.pluginList.filter(p => p.name !== pluginName)
    },
  },
  mounted() {
    this.loadPluginList();
  },
};
</script>