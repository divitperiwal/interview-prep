"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { logOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

const DropDownMenu = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const [actionPending, setActionPending] = useState<"profile" | "logout" | null>(null);

  const handleLogout = async () => {
    setActionPending("logout");
    const result = await logOut();
    if (!result?.success) {
      console.error(result?.message);
    }
    router.push("/sign-in");
  };

  const handleProfile = () => {
    setActionPending("profile");
    router.push("/profile");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full border border-white/15 bg-white/5 p-1 hover:bg-white/10 transition-colors">
          <Image
            src={"/profile.svg"}
            alt="profile"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#111111] border-white/15 text-white">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleProfile}
            disabled={actionPending !== null}
          >
            <Image src={"/person.svg"} alt="person" width={16} height={16} />
            {actionPending === "profile" && <span className="spinner" aria-hidden="true" />}
            <span>{actionPending === "profile" ? "Opening..." : "Profile"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleLogout}
            disabled={actionPending !== null}
          >
            <Image src={"/logout.svg"} alt="logout" width={16} height={16} />
            {actionPending === "logout" && <span className="spinner" aria-hidden="true" />}
            <span>{actionPending === "logout" ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenu;
