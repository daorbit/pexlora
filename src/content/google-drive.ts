export const driveCopy = {
  import: "Select from Google Drive",
  short: "Google Drive",
  pickerTitle: "Choose files for Pexlora",
  save: "Save to Google Drive",
  saveAll: (count: number) => (count > 1 ? `Save ${count} to Google Drive` : "Save to Google Drive"),
  saving: "Saving to Google Drive",
  saved: (count: number) => (count > 1 ? `${count} files saved to your Pexlora folder in Drive` : "Saved to your Pexlora folder in Drive"),
  openDrive: "Open",
  denied: "Google Drive access wasn't allowed. Try again and allow access to continue.",
  failed: "Google Drive didn't respond. Please try again.",
  saveFailed: "Couldn't save to Google Drive. Please try again.",
};
