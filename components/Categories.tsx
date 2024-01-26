"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Dispatch, SetStateAction } from "react";

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

interface Props {
  setQ: Dispatch<SetStateAction<string>>;
}

const Categories = ({ setQ }: Props) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container gap-4">
        {categories.map((slide) => (
          <div
            key={slide}
            className="embla__slide border rounded py-3 lg:px-11 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => setQ(slide)}
          >
            <p className="capitalize text-center">{slide}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
