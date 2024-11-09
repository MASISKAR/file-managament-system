<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from "#vue-router";
import Header from './components/Header.vue';
import Modal from './components/Modal.vue';

const route = useRoute();

const currentFolderName = computed(() => {
  return route.params.folder ? route.params.folder.at(-1) : 'Root folder';
});

</script>

<template>
  <v-app>
    <Header/>
    <v-main class="mt-9">
      <h3 class="text-left ml-2">{{currentFolderName}}</h3>
      <v-container fluid>
        <nuxt-page/>
      </v-container>
    </v-main>
    <Modal/>
  </v-app>
</template>
