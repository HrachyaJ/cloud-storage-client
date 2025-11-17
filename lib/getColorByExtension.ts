const extColor = {
  pdf: "purple",
  xls: "green",
  xlsx: "green",
  doc: "blue",
  docx: "blue",
  txt: "blue",
  png: "orange",
  jpg: "orange",
  jpeg: "orange",
  gif: "orange",
  webp: "orange",
  svg: "orange",
  zip: "red",
  rar: "red",
  "7z": "red",
  mp4: "pink",
  mov: "pink",
  avi: "pink",
  mp3: "yellow",
  wav: "yellow",
} as const;

export type Extension = keyof typeof extColor;
export type Color = (typeof extColor)[Extension];

export const getColorByExtension = (ext?: string): Color => {
  if (!ext) return "gray" as Color;
  const lowerExt = ext.toLowerCase();
  return extColor[lowerExt as Extension] || ("gray" as Color);
};
