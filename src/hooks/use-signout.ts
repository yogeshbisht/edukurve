import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
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
  };

  return { signOut };
};
