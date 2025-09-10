import Counter from "@/components/custum/Counter";
import Galerie from "@/components/custum/Galerie";
import { getImages } from "@/lib/getImages";

export default async function Page() {
  const imgFolder = process.env.NEXT_PUBLIC_IMG_FOLDER || "";
  const images = getImages(imgFolder);

  return (
    <>
      <div
        dir="ltr"
        className={`grid grid-flow-row grid-cols-1 grid-rows-2 text-center border-2`}
      >
        <Galerie images={images} />
        <Counter />
      </div>
    </>
  );
}
