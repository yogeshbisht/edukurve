"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        fetchOptions: {
          onError: (error) => {
            toast.error(error.error.statusText);
          },
        },
      });
    });
  }

  return (
    <AuthWrapper type="login">
      <Button
        className="w-full"
        onClick={signInWithGithub}
        disabled={githubPending}
      >
        {githubPending ? (
          <>
            <Loader2 className="animate-spin size-4" />
            <span className="ml-2">Signing in...</span>
          </>
        ) : (
          <>
            <Image
              src="/icons/github.svg"
              alt="Github"
              width={20}
              height={20}
            />
            Continue with Github
          </>
        )}
      </Button>
    </AuthWrapper>
  );
};

export default LoginForm;
