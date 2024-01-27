"use client";
import MainHeading from "../../components/MainHeading";
import List from "../../components/List";
import React, { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Trending from "@/components/Trending";
import { useSearchParams } from "next/navigation";
import ImageCard from "@/components/ImageCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImageData, User } from "@/types";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, refetchOnWindowFocus: false },
  },
});

const WithSuspense = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Homepage />
    </Suspense>
  );
};
export default WithSuspense;

function Homepage(): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [img, setImg] = useState<ImageData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const imageId = searchParams.get("photo");
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateSearchQuery = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (inputValue.length > 0 && inputValue !== searchQuery) {
        if (isHeadingVisible) setIsHeadingVisible(false);
        setSearchQuery(inputRef.current.value);
      }
    }
  };

  useEffect(() => {
    if (imageId) {
      const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_KEY}&id=${imageId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setImg(data.hits[0]);
        });
    }
  }, [imageId]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchQuery;
    }
  }, [searchQuery]);

  return (
    <LayoutGroup>
      <motion.div
        layout="position"
        transition={spring}
        className="flex-1 w-full flex flex-col items-center h-screen max-h-[100vh] max-w-screen-2xl"
      >
        <Navbar user={user} />
        <MainHeading show={isHeadingVisible} />
        <Search inputRef={inputRef} updateSearchQuery={updateSearchQuery} />
        {searchQuery ? (
          <div>
            <p className="text-5xl font-bold text-white my-8">
              Results: <span>{searchQuery}</span>
            </p>
          </div>
        ) : (
          <Trending />
        )}
        <QueryClientProvider client={queryClient}>
          {searchQuery.length > 0 && (
            <List
              show={!isHeadingVisible}
              q={searchQuery}
              setQ={setSearchQuery}
            />
          )}
        </QueryClientProvider>
      </motion.div>
      {img && isHeadingVisible && <ImageCard img={img} showTrigger={false} />}
      {user && (
        <Link
          href={"/history"}
          className="absolute top-2 right-2 md:top-8 md:right-8 underline text-white bg-gray-400 py-2 px-4 rounded"
        >
          History
        </Link>
      )}
    </LayoutGroup>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
