"use client";
import HistoryItem from "@/components/HistoryItem";
import { User } from "@/types";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function History() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<{ image_id: number }[]>([]);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchRecords(session.user.id);
      } else {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRecords = async (user_id: string) => {
    const { data } = await supabase
      .from("downloads")
      .select("image_id")
      .eq("id", user_id);
    data && setData(data);
  };
  if (!user) {
    return null;
  }

  return (
    <>
      <p className="text-4xl mt-8 text-white">History</p>
      <div className="grid md:grid-cols-3 grid-cols-1 m-9 gap-14">
        {data?.length > 0 &&
          data?.map((imageData) => (
            <HistoryItem
              image_id={imageData.image_id}
              key={imageData.image_id}
            />
          ))}
      </div>
      <Link
        href="/"
        className="absolute top-8 right-8 underline text-white bg-gray-400 py-2 px-4 rounded"
      >
        Home
      </Link>
    </>
  );
}
