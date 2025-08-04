import { adminGetLesson } from "@/data/admin/admin-get-lesson";
import LessonForm from "./_components/lesson-form";

type LessonPageProps = {
  params: Promise<{ courseId: string; chapterId: string; lessonId: string }>;
};

const LessonPage = async ({ params }: LessonPageProps) => {
  const { courseId, chapterId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <LessonForm chapterId={chapterId} lesson={lesson} courseId={courseId} />
  );
};

export default LessonPage;
