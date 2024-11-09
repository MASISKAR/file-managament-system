import {defineStore} from 'pinia';

interface FileSystemItem {
  name: string;
  type: 'file' | 'folder';
  items?: FileSystemItem[];
}

interface State {
  modalError: string;
  isModalOpen: boolean;
  items: FileSystemItem[];
}

const folderDepthError = 'Invalid path: the folder depth should be at most 2';
const invalidPathError = 'Invalid path: the path must not contain files between folders, it must be the last item';

export const useStore = defineStore('fs', {
  state: (): State => {
    return {
      modalError: '',
      isModalOpen: false,
      items: [],
    };
  },
  actions: {
    toggleModal(open: boolean) {
      this.isModalOpen = open;
    },

    addFsItems(path: string, routePath: string) {
      const pathParts = path.split('/').filter(Boolean);
      const routeParts = routePath.split('/').filter(Boolean);
      if (pathParts.length + routeParts.length > 2) {
        this.modalError = folderDepthError;
        return;
      }

      const partsWithoutLast = pathParts.slice(0, pathParts.length - 1);
      const hasFiles = partsWithoutLast.some(part => part.includes('.'));
      if (hasFiles) {
        this.modalError = invalidPathError;
        return;
      }

      let currentItems = this.items;

      for (const part of routeParts) {
        const folder = currentItems.find(item => item.name === part && item.type === 'folder');
        if (!folder) {
          return;
        }
        currentItems = folder.items || (folder.items = []);
      }

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        const isLastPart = i === pathParts.length - 1;
        const type = isLastPart && part.includes('.') ? 'file' : 'folder';

        let existingItem = currentItems.find(item => item.name === part && item.type === type);

        if (!existingItem) {
          existingItem = {name: part, type};
          if (type === 'folder') existingItem.items = [];
          currentItems.push(existingItem);
        }

        if (type === 'folder') {
          currentItems = existingItem.items;
        }
      }
      this.modalError = '';
      this.isModalOpen = false;
    }
  },
});
