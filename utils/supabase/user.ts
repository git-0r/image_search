"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const getUserServer = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error, supabase };
};
