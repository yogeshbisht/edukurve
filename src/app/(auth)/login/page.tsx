import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AuthWrapper from "@/components/auth/auth-wrapper";

const LoginPage = () => {
  return (
    <AuthWrapper type="login">
      <Button className="w-full">
        <Image src="/icons/github.svg" alt="Github" width={20} height={20} />
        Continue with Github
      </Button>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-4">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          Or Continue With
        </span>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="m@example.com" />
        </div>
        <Button className="w-full">Continue with Email</Button>
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

export default LoginPage;
