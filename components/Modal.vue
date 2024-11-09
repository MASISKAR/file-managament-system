<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from '~/store';

const store = useStore();
const route = useRoute();
const inputPath = ref('');

const createItem = () => {
store.addFsItems(inputPath.value.trim(), route.path);
};

const isModalOpen = computed(() => store.isModalOpen);

watch(isModalOpen, (isOpen) => {
if (!isOpen) inputPath.value = '';
});

</script>

<template>
  <div class="text-center pa-4">
    <v-dialog
        :modelValue="isModalOpen"
        @update:modelValue="store.toggleModal(false)"
        width="auto"
    >
      <v-card
          max-width="400"
          prepend-icon="mdi-file"
          title="Add a new file or folder"
      >
        <v-text-field
            v-model="inputPath"
            label="Type here a file or folder path"
            outlined
            placeholder="e.g., /pictures/album"
        />
        <v-alert
            v-if="store.modalError"
            color="error"
            icon="mdi-alert"
            outlined
        >
          {{ store.modalError }}
        </v-alert>
        <template v-slot:actions>
          <v-btn
              class="ms-auto"
              text="Add"
              variant="outlined"
              color="success"
              @click="createItem"
          ></v-btn>
          <v-btn
              class="ms-auto"
              variant="outlined"
              color="error"
              text="Cancel"
              @click="store.toggleModal(false)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
