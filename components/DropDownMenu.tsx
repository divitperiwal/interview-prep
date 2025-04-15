"use client";

import React from "react";
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
  const handleLogout = async () => {
    const result = await logOut();
    if (!result?.success) {
      console.error(result?.message);
    }
    router.push("/sign-in");
  };
  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={"/profile.svg"}
            alt="profile"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleProfile}>
            <Image src={"/person.svg"} alt="person" width={16} height={16} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <section
              className="flex flex-row items-center gap-2"
              onClick={handleLogout}
            >
              <Image src={"/logout.svg"} alt="logout" width={16} height={16} />
              <span>Log out</span>
            </section>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownMenu;
