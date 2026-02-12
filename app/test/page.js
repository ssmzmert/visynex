import fs from "node:fs/promises";
import path from "node:path";
import TestGallery from "./TestGallery";

const imagePattern = /\.(png|jpe?g|webp|gif|avif)$/i;

export default async function TestPage() {
  const testDir = path.join(process.cwd(), "public", "test");
  let files = [];

  try {
    files = await fs.readdir(testDir);
  } catch (error) {
    files = [];
  }

  const images = files.filter((file) => imagePattern.test(file));
  const perfectIndex = images.findIndex(
    (file) => file.toLowerCase() === "perfect.jpg"
  );
  const perfectName = perfectIndex >= 0 ? images.splice(perfectIndex, 1)[0] : null;

  images.sort((a, b) => a.localeCompare(b));

  const orderedImages = perfectName ? [perfectName, ...images] : images;

  return (
    <div className="min-h-screen bg-graphite text-white section-padding">
      <div className="mx-auto max-w-6xl">
        <p className="section-title">Test Results</p>
        <h1 className="section-heading mt-4">Sample Inspection Images</h1>
        <p className="mt-4 text-mist">
          Perfect sample first, then the rest load in sequence.
        </p>
        <TestGallery images={orderedImages} perfectName={perfectName} />
      </div>
    </div>
  );
}
