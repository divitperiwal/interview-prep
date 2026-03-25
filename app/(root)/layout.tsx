import { getCurrentUser } from "@/lib/actions/auth.actions";
// import { isAuthenticated } from "@/lib/actions/auth.actions";
// import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import DropDownMenu from "@/components/DropDownMenu";

const RootLayout = async({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  // const isUserAuthenticated = await isAuthenticated();
  // TODO: Temporarily disabled for dev - re-enable auth check
  // if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex flex-row items-center justify-between border border-white/10 rounded-lg px-4 py-3 bg-white/5 backdrop-blur-sm shadow-md sticky top-0 z-50">

        <Link href="/" className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80">
        <Image 
        src={"/logo.svg"}
        alt="logo"
        width={38}
        height={32}
        />
      <h2 className="text-white hidden sm:inline">PrepWise</h2>

        </Link>
        <DropDownMenu userName = {user?.name || ""}/>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
