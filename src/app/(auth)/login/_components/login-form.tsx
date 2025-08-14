"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";

const LoginForm = () => {
  const [googlePending, startGoogleTransition] = useTransition();
  const [githubPending, startGithubTransition] = useTransition();
  const { theme } = useTheme();

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        fetchOptions: {
          onError: (error) => {
            toast.error(error.error.statusText);
          },
        },
      });
    });
  };

  const signInWithGithub = async () => {
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
  };

  return (
    <AuthWrapper type="login">
      <div className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={signInWithGoogle}
          disabled={googlePending}
        >
          {googlePending ? (
            <>
              <Loader2 className="animate-spin size-4" />
              <span className="ml-2">Signing in...</span>
            </>
          ) : (
            <>
              <Image
                src={
                  theme === "dark"
                    ? "/icons/google-dark.svg"
                    : "/icons/google-light.svg"
                }
                alt="Google"
                width={16}
                height={16}
                className="mr-2"
              />
              Continue with Google
            </>
          )}
        </Button>

        <Button
          className="w-full"
          variant="outline"
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
                src={
                  theme === "dark"
                    ? "/icons/github-dark.svg"
                    : "/icons/github-light.svg"
                }
                alt="Github"
                width={16}
                height={16}
                className="mr-2"
              />
              Continue with Github
            </>
          )}
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default LoginForm;
