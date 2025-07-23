import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <h1 className="font-bold text-5xl">Hello, {session.user.name}</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;
