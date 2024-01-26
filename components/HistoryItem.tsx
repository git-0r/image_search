import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { ImageData } from "@/types";

interface Props {
  image_id: number;
}
export default function HistoryItem({ image_id }: Props) {
  const [img, setImg] = useState<ImageData | null>(null);

  useEffect(() => {
    if (image_id) {
      const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&id=${image_id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setImg(data.hits[0]);
        });
    }
  }, []);
  return <>{img && <ImageCard img={img} />}</>;
}
