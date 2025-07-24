"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, SendIcon } from "lucide-react";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import AuthWrapper from "@/components/auth/auth-wrapper";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

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

  async function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("OTP sent to your email");
            router.push(`/verify-email?email=${email}&type=sign-in`);
          },
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

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-4">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          Or Continue With
        </span>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          onClick={signInWithEmail}
          disabled={emailPending}
        >
          {emailPending ? (
            <>
              <Loader2 className="animate-spin size-4" />
              <span className="ml-2">Sending OTP...</span>
            </>
          ) : (
            <>
              <SendIcon className="size-4" />
              Continue with Email
            </>
          )}
        </Button>
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground text-right"
        >
          Forgot password?
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default LoginForm;
