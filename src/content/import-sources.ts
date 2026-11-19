export const importCopy = {
  tooLarge: (name: string, mb: number) => `${name} is over ${mb} MB, so it wasn't added.`,
  unsupported: (name: string) => `${name} can't be used with this tool.`,
};

export const dropboxCopy = {
  import: "Select from Dropbox",
  failed: "Dropbox didn't respond. Please try again.",
};

export const urlImportCopy = {
  open: "Add from a link",
  title: "Add a file from a link",
  label: "File link",
  placeholder: "https://example.com/photo.jpg",
  submit: "Add File",
  working: "Fetching file",
  close: "Close",
  note: "Paste a direct link to a file. If the site blocks direct downloads, Pexlora fetches it for you without keeping a copy.",
  invalid: "Enter a full link that starts with http:// or https://.",
  notFile: "That link opens a web page, not a file. Copy the direct link to the file.",
  blocked: "That address can't be used.",
  tooLarge: (mb: number) => `Files fetched through Pexlora are limited to ${mb} MB. Download it and add it from your device instead.`,
  failed: "Couldn't fetch that file. Check the link and try again.",
};
