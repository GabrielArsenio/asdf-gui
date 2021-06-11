<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Novo plugin
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Nome*"
                required
                :rules="rules"
                v-model="pluginName"
                @keyup.enter="add(pluginName)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="add(pluginName)"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { add } from '../services/asdf.service'

  export default {
    props: ['value'],
    data () {
      return {
        dialog: false,
        loading: false,
        rules: [() => this.isValidPlugin || 'Plugin não encontrado'],
        isValidPlugin: true,
        pluginName: null
      }
    },
    methods: {
      async add (pluginName) {
        try {
          this.isValidPlugin = true
          this.loading = true

          await add(pluginName)

          this.value.unshift({ name: pluginName, version: "______", })
          this.pluginName = null
        } catch (error) {
          this.isValidPlugin = false
        } finally {
          this.loading = false
        }
      },
      close () {
        this.dialog = false
        this.pluginName = null
        this.isValidPlugin = true
      }
    }
  }
</script>