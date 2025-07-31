"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import { AdminCourseSingularType } from "@/data/admin/admin-get-course";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  GripVerticalIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseStructureProps {
  course: AdminCourseSingularType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => React.ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string; // only for lessons
  };
}

const CourseStructure = ({ course }: CourseStructureProps) => {
  const initialItems =
    course.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];
  const [items, setItems] = useState(initialItems);

  const SortableItem = ({
    children,
    id,
    className,
    data,
  }: SortableItemProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("touch-none", className, isDragging ? "z-10" : "")}
      >
        {children(listeners)}
      </div>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleChapter = (chapterId: string) => {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-border">
          <CardTitle>Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  data={{ type: "chapter" }}
                >
                  {(listeners) => (
                    <Card>
                      <Collapsible
                        open={item.isOpen}
                        onOpenChange={() => toggleChapter(item.id)}
                      >
                        <div className="flex items-center justify-between p-3 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-grab opacity-60 hover:opacity-100"
                              {...listeners}
                            >
                              <GripVerticalIcon className="size-4" />
                            </Button>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="icon">
                                {item.isOpen ? (
                                  <ChevronDownIcon className="size-4" />
                                ) : (
                                  <ChevronRightIcon className="size-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>

                            <p className="cursor-pointer hover:text-primary pl-2">
                              {item.title}
                            </p>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive/80 hover:text-destructive"
                          >
                            <Trash2Icon className="size-4" />
                          </Button>
                        </div>

                        <CollapsibleContent>
                          <div className="p-1">
                            <SortableContext
                              items={item.lessons.map((lesson) => lesson.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {item.lessons.map((lesson) => (
                                <SortableItem
                                  key={lesson.id}
                                  id={lesson.id}
                                  data={{ type: "lesson", chapterId: item.id }}
                                >
                                  {(lessonListeners) => (
                                    <div
                                      key={lesson.id}
                                      className="flex items-center justify-between p-2 hover:bg-accent rounded-sm"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          {...lessonListeners}
                                        >
                                          <GripVerticalIcon className="size-4" />
                                        </Button>
                                        <FileTextIcon className="size-4" />

                                        <Link
                                          href={`/admin/courses/${course.id}/${item.id}/${lesson.id}`}
                                        >
                                          {lesson.title}
                                        </Link>
                                      </div>

                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-destructive/80 hover:text-destructive"
                                      >
                                        <TrashIcon className="size-4" />
                                      </Button>
                                    </div>
                                  )}
                                </SortableItem>
                              ))}
                            </SortableContext>
                            <div className="p-2">
                              <Button variant="outline" className="w-full">
                                Create New Lesson
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  )}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
};

export default CourseStructure;
