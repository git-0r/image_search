import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => setUser(data.user))
      .catch((error) => console.error(error));
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    return router.refresh();
  };

  return user ? (
    <div className="flex items-center gap-4 ml-auto">
      <button onClick={signOut} className="border-2 border-transparent">
        Logout
      </button>
    </div>
  ) : (
    <Link href="/login" className="ml-auto">
      Login
    </Link>
  );
}
