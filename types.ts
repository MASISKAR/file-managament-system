interface FileItem {
  name: string;
  type: 'file';
}

interface FolderItem {
  name: string;
  type: 'folder';
  items?: FileSystemItem[];
}

type FileSystemItem = FileItem | FolderItem;

export type { FileSystemItem };
