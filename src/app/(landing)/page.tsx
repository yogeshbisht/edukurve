"use client";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import {
  VideoIcon,
  ShieldIcon,
  BarChart3Icon,
  ZapIcon,
  SparklesIcon,
  BrainIcon,
  UsersIcon,
} from "lucide-react";
import { FeatureProps } from "@/lib/types";

const features: FeatureProps[] = [
  {
    title: "Rich Content Creation",
    description:
      "Create engaging courses with rich text editor, video uploads, and structured lesson organization.",
    icon: VideoIcon,
  },
  {
    title: "Secure Learning Environment",
    description:
      "Enterprise-grade security with authentication, role-based access, and secure payment processing.",
    icon: ShieldIcon,
  },
  {
    title: "Advanced Analytics",
    description:
      "Track student progress, enrollment statistics, and course performance with real-time insights.",
    icon: BarChart3Icon,
  },
  {
    title: "Modern Tech Stack",
    description:
      "Built with Next.js 15, TypeScript, and AWS S3 for optimal performance and scalability.",
    icon: ZapIcon,
  },
  {
    title: "AI-Powered Courses",
    description:
      "AI-powered courses with personalized learning paths, quizzes, and real-time feedback.",
    icon: BrainIcon,
  },
  {
    title: "Community Support",
    description:
      "Connect with a global community of learners and experts to share your learning journey.",
    icon: UsersIcon,
  },
];

const LandingPage = () => {
  const { data: session } = authClient.useSession();

  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="outline">
            <SparklesIcon className="size-4 mr-1" />
            The Education Platform
            <SparklesIcon className="size-4 mr-1" />
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
            Enhance your learning and skills
          </h1>
          <p className="text-muted-foreground max-w-2xl md:text-lg">
            Learn from the best in the industry and <br />
            create a journey for yourself with personalized learning paths.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2 flex justify-center items-center">
                  <feature.icon className="size-12 text-primary border-2 border-primary rounded-full p-2" />
                </div>
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
