"use client";

import { AnimatePresence, motion } from "framer-motion";
import Categories from "./Categories";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  show: boolean;
  q: string;
  setQ: Dispatch<SetStateAction<string>>;
}

import { ImageData } from "@/types";
import Loader from "./Loader";
import ImageCard from "./ImageCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function List({ show, q, setQ }: Props) {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["query", q],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `https://pixabay.com/api/?key=${
            process.env.NEXT_PUBLIC_PIXABAY_KEY
          }&q=${q.split(" ").join("+")}&image_type=photo&page=${pageParam}`
        );
        const data = await res.json();
        return {
          ...data,
          nextId:
            pageParam < Math.ceil(data.totalHits / 20)
              ? pageParam + 1
              : undefined,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.nextId ?? undefined;
      },
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white w-full h-full flex flex-1 rounded-t-2xl overflow-y-scroll"
        >
          <div className={"w-full relative"}>
            <div className="p-8 bg-gray-100 sticky top-0 z-10">
              <Categories setQ={setQ} />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 m-9 gap-14">
              {data?.pages.map((page) => (
                <React.Fragment key={page.nextId}>
                  {page.hits.map((img: ImageData) => (
                    <ImageCard img={img} key={img.id} />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Loader />
              ) : hasNextPage ? (
                "Load Newer"
              ) : (
                "Nothing more to load"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
