import { buttonVariants } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const AdminCoursePage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/admin/courses/create"
        >
          <IconPlus />
          Create Course
        </Link>
      </div>

      <div>
        <h1>this is the course page</h1>
      </div>
    </>
  );
};

export default AdminCoursePage;
