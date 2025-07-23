import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
