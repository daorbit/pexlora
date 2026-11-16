export async function fetchAsFile(src: string, fileName: string) {
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Couldn't load ${fileName}.`);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
