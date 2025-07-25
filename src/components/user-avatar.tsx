import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "better-auth";

interface UserAvatarProps {
  user: User;
  displayName?: boolean;
}

const UserAvatar = ({ user, displayName }: UserAvatarProps) => {
  const { name, email, image } = user;

  const avatarImage = image ?? "";
  const avatarName = name || email;
  const avatarFallback = avatarName?.charAt(0).toUpperCase();
  const username = name ? name : email.split("@")[0];

  return (
    <>
      <Avatar>
        <AvatarImage src={avatarImage} alt="Profile image" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      {displayName && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium capitalize">{username}</span>
          <span className="text-muted-foreground truncate text-xs">
            {email}
          </span>
        </div>
      )}
    </>
  );
};

export default UserAvatar;
