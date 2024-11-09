<script setup lang="ts">
import {useStore} from '~/store';
const store = useStore();
</script>

<template>
  <v-app-bar
      color="primary"
      density="compact"
      class="pa-4"
  >
    <template v-slot:prepend>
      <nuxt-link to="/">
        <v-icon icon="mdi-home"/>
      </nuxt-link>
      <v-app-bar-title class="pa-2">File management System</v-app-bar-title>
    </template>
    <template v-slot:append>
      <v-btn @click="store.toggleModal(true)" variant="outlined">
        <v-icon icon="mdi-folder"></v-icon>
        Add file or folder
      </v-btn>
    </template>
  </v-app-bar>
</template>
