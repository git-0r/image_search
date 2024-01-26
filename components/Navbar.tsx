import Link from "next/link";
import AuthButton from "./AuthButton";
import { User } from "@/types";

interface Props {
  user: User | null;
}
export default function Navbar({ user }: Props) {
  return (
    <div className="blur_styles py-4 md:px-10 px-4 flex md:w-[70%] w-[95%] gap-4 items-center mt-10 text-white">
      <Link href="/">Homepage</Link>
      <AuthButton />
      {!user && (
        <Link
          href={"/login"}
          className="border-2 border-white box-border px-2 rounded-md font-semibold"
        >
          Create Account
        </Link>
      )}
    </div>
  );
}
