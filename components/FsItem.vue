<script setup lang="ts">
import {defineProps} from 'vue';
import type {FileSystemItem} from '~/types';


const props = defineProps<{
  data: FileSystemItem;
}>();

const {type, name} = props.data;
</script>

<template>
  <v-card
      class="mx-auto"
      :prepend-icon="type === 'folder' ? 'mdi-folder' : 'mdi-file'"
      :subtitle="type"
      width="auto"
  >
    <template v-slot:title>
      <span class="font-weight-black">{{ name }}</span>
    </template>
  </v-card>
</template>
