import EmptyState from "@/components/empty-state";
import { getAllCourses } from "@/data/course/get-all-courses";
import { getEnrolledCourses } from "@/data/user/get-enrolled-courses";
import PublicCourseCard from "../(landing)/_components/public-course-card";
import Link from "next/link";

const DashboardPage = async () => {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const filteredCourses = courses.filter(
    (course) =>
      !enrolledCourses?.some(
        ({ course: enrolled }) => enrolled.id === course.id
      )
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here you can see all the courses you have access to
        </p>
      </div>

      {enrolledCourses?.length === 0 ? (
        <EmptyState
          title="No courses purchased"
          description="You haven't purchased any courses yet"
          buttonText="Browse Courses"
          buttonLink="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses?.map((course) => (
            <Link
              href={`/dashboard/${course.course.slug}`}
              key={course.course.id}
            >
              {course.course.title}
            </Link>
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses available
          </p>
        </div>

        {filteredCourses.length < 1 ? (
          <EmptyState
            title="No courses available"
            description="You have already purchased all available courses"
            buttonText="Browse Courses"
            buttonLink="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <PublicCourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default DashboardPage;
