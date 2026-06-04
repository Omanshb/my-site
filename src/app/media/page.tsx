import { readdirSync } from "node:fs";
import path from "node:path";

import { TopLeftStatus } from "@/components/layout/top-left-status";
import { TopNav } from "@/components/layout/top-nav";
import { MediaPhotoGallery } from "@/components/media/media-photo-gallery";

const PHOTO_COLLECTION_PATH = "photocollection-optimized";
const PHOTO_DIRECTORY = path.join(
  process.cwd(),
  "public",
  PHOTO_COLLECTION_PATH,
);
const IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|webp|gif)$/i;

const getPhotoCollectionImages = () => {
  const images = readdirSync(PHOTO_DIRECTORY)
    .filter((fileName) => IMAGE_EXTENSION_PATTERN.test(fileName))
    .map((fileName) => `/${PHOTO_COLLECTION_PATH}/${fileName}`);

  return images.sort((a, b) => seededValue(a) - seededValue(b));
};

const seededValue = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

export default function MediaPage() {
  const images = getPhotoCollectionImages();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <MediaPhotoGallery images={images} />
      <TopLeftStatus />
      <TopNav />
    </main>
  );
}
