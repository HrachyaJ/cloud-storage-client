const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "ico",
  "tiff",
  "tif",
] as const;

export const isImage = (extension?: string): boolean => {
  if (!extension) return false;
  const lowerExt = extension.toLowerCase();
  return imageExtensions.includes(lowerExt as any);
};
