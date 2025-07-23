import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <h1 className="font-bold text-5xl">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;
