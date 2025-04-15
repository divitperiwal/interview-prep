import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import DropDownMenu from "@/components/DropDownMenu";

const RootLayout = async({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex flex-row items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
        <Image 
        src={"/logo.svg"}
        alt="logo"
        width={38}
        height={32}
        />
      <h2 className="text-primary-100">PrepWise</h2>

        </Link>
        <DropDownMenu userName = {user?.name || ""}/>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
