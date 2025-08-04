"use client";

import { useParams } from "next/navigation";

const CoursePage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};

export default CoursePage;
