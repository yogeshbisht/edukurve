"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          toast.success("Signed out successfully");
        },
        onError: (error) => {
          toast.error(error.error.statusText);
        },
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      {session ? (
        <>
          <h1 className="font-bold text-5xl">Hello, {session.user.email}</h1>
          <Button onClick={signOut}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
};

export default HomePage;
