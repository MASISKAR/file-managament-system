<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import {useStore} from '~/store';
import FsItem from '~/components/FsItem.vue';
import type {FileSystemItem} from '~/types';

const store = useStore();
const route = useRoute();

const items = computed((): FileSystemItem[] => {
  if (!route.params.folder) return store.items;

  let fsItems = store.items;

  for (let itemName of route.params.folder) {
    const currentFolder = fsItems.find(
        (item) => item.name === itemName && item.type === 'folder'
    );
    fsItems = currentFolder?.items || [];
  }
  return fsItems;
});


const currentPath = computed(() => {
  return route.path.split('/').filter(Boolean).join('/');
});

</script>

<template>
  <v-row dense>
    <template v-if="items.length">
      <v-col
          v-for="(item, index) in items"
          :key="index+item.name"
          md="2"
          sm="3"
          cols="12"
          :class="{'cursor-pointer': item.type === 'folder'}"
      >
        <nuxt-link
            v-if="item.type === 'folder'"
            :to="`${currentPath}/${item.name}`"
        >
          <FsItem :data="item"/>
        </nuxt-link>
        <template v-else>
          <FsItem :data="item"/>
        </template>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12">
        <v-alert
            color="warning"
            icon="mdi-alert"
            outlined
        >
          The folder is empty
        </v-alert>
      </v-col>
    </template>
  </v-row>
</template>
