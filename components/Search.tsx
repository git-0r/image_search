import { motion } from "framer-motion";
import Image from "next/image";
import SearchIcon from "../app/search-outline.svg";
import { RefObject } from "react";

interface Props {
  inputRef: RefObject<HTMLInputElement>;
  updateSearchQuery: () => void;
}

export default function Search({ inputRef, updateSearchQuery }: Props) {
  return (
    <motion.div
      layout="position"
      transition={spring}
      className="blur_styles py-4 md:px-10 px-4 flex md:w-[50%] w-[90%] items-center justify-between md:mt-20 mt-10 text-white"
    >
      <div className="flex gap-4 flex-1">
        <Image src={SearchIcon} alt="search" width={25} height={25} />
        <form
          className="border-l-2 border-white pl-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            updateSearchQuery();
          }}
        >
          <input
            ref={inputRef}
            className="bg-transparent outline-none placeholder:text-white w-full"
            placeholder="Search"
          />
        </form>
      </div>
      <button
        className="border-2 py-1 px-4 border-white rounded-lg"
        onClick={updateSearchQuery}
      >
        Go!
      </button>
    </motion.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
