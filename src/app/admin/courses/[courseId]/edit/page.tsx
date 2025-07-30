import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminGetCourse } from "@/data/admin/admin-get-course";
import EditCourseForm from "./_components/edit-course-form";

type Params = Promise<{ courseId: string }>;

const EditCoursePage = async ({ params }: { params: Params }) => {
  const { courseId } = await params;

  const course = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course: <span className="text-primary">{course.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="lessons">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Update the basic information of the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm course={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditCoursePage;
