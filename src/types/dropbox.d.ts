type DropboxChooserFile = { name: string; link: string; bytes: number; isDir: boolean };

type DropboxChooseOptions = {
  success: (files: DropboxChooserFile[]) => void;
  cancel?: () => void;
  linkType: "direct" | "preview";
  multiselect: boolean;
  folderselect?: boolean;
  extensions?: string[];
};

interface Window {
  Dropbox?: { choose: (options: DropboxChooseOptions) => void };
}
