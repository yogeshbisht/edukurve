import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const requireUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return session.user;
};
