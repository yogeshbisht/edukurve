import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ADMIN_MENU_ITEMS, USER_MENU_ITEMS } from "@/constants";
import Link from "next/link";
import { IconLogout } from "@tabler/icons-react";
import UserAvatar from "../user-avatar";
import { User } from "@/lib/types";
import { useSignOut } from "@/hooks/use-signout";

const UserMenu = ({ user }: { user: User }) => {
  const { signOut } = useSignOut();

  const isAdmin = user.role === "admin";
  const menuItems = isAdmin ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar user={user} displayName />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={item.href}>
              <item.icon />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={signOut}>
        <IconLogout />
        Log out
      </DropdownMenuItem>
    </>
  );
};

export default UserMenu;
