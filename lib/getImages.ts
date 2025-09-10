
import  fs from "fs";
import path from "path";
export function getImages(folderPath: string) {
  const images: { name: string; path: string }[] = [];
  const pathAbsolu = path.join(process.cwd(), folderPath);
  try {
    const files = fs.readdirSync(pathAbsolu);
    files.forEach((file) => {
      const fileExt = path.extname(file).toLowerCase();
      if ([".jpg", ".png", "jpeg", ".webp"].includes(fileExt))
        images.push({
          name: file,
          path: path.join(folderPath, file).substring(7).replaceAll("\\", "/"),
        });
    });
  } catch (error) {
    console.log("Erreur de lecture du dossier: ", error);
    return [];
  }
  return images;
}
