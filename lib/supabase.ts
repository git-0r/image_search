"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const handleDownload = async (imageId: number) => {
  if (!imageId) {
    console.error("Invalid image id.");
    return;
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user: ", error.message);
    return;
  }

  if (user) {
    const { count } = await supabase
      .from("downloads")
      .select("id, image_id", { head: true, count: "exact" })
      .eq("id", user.id)
      .eq("image_id", imageId);

    if (!count) {
      const { error } = await supabase
        .from("downloads")
        .insert({ id: user?.id, image_id: imageId });

      if (error) {
        console.error("Error adding download to user: ", error.message);
      }
    }
  }
};
