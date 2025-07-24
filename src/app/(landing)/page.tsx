"use client";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}

const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of courses covering various topics and industries.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive lessons, quizzes, and hands-on projects.",
    icon: "🎯",
  },
  {
    title: "Progress Tracking",
    description:
      "Track your progress and stay motivated with detailed analytics.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description: "Connect with a global community of learners and experts.",
    icon: "👥",
  },
];

const LandingPage = () => {
  const { data: session } = authClient.useSession();

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="outline">The Future of Education</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
            Elevate your learning with AI
          </h1>
          <p className="text-muted-foreground max-w-2xl md:text-lg">
            Learn from the best with AI-powered courses and personalized
            learning paths.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link
              href="/courses"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Explore Courses
            </Link>
            {!session && (
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
