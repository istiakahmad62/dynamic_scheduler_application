import { useSortable } from "@dnd-kit/sortable";
import { DraggableCourseCellProps } from "./draggableCourseCell.type";
import { CSS } from "@dnd-kit/utilities";

export const DraggableCourseCell: React.FC<DraggableCourseCellProps> = ({
  course,
  teacherId,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: course.courseId,
    data: {
      teacherId,
      courseId: course.courseId,
      courseGroup: course.courseGroup,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-1 p-1 bg-white rounded border border-gray-300 cursor-move hover:border-blue-500 hover:shadow-sm text-xs"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">{course.courseName}</span>
        <span className="text-gray-600">Load: {course.load}</span>
      </div>
      <div className="text-gray-500 text-xs">Students: {course.students}</div>
    </div>
  );
};
