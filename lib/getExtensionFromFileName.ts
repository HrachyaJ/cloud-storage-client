export const getExtensionFromFileName = (filename: string): string => {
  const ext = filename.split(".").pop();
  return ext ? ext.toLowerCase() : "";
};
