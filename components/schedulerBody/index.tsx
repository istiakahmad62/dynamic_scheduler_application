import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import React, { useMemo, useState } from "react";
import { SchedulerBodyProps } from "./schedulerBody.type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { CalculatedTeacher } from "@/types";
import clsx from "clsx";
import {
  calculateTeacherMetrics,
  getCourseGroupColor,
  getDivisionColor,
} from "@/lib/utils";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableCourseCell } from "../draggableCourseCell";
import { useVirtualizer } from "@tanstack/react-virtual";

export const SchedulerBody: React.FC<SchedulerBodyProps> = ({
  teachers,
  courseGroups,
  collapsedDivisions,
  collapsedCourseGroups,
  onUpdateTeacher,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [draggedItem, setDraggedItem] = useState<{
    teacherId: string;
    courseId: string;
  } | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current) {
      setDraggedItem({
        teacherId: active.data.current.teacherId,
        courseId: active.data.current.courseId,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !draggedItem) {
      setDraggedItem(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData && overData && activeData.courseId !== overData.courseId) {
      const teacher = teachers.find((t) => t.id === draggedItem.teacherId);
      if (teacher) {
        const updatedAssignments = [...teacher.courseAssignments];
        const fromIndex = updatedAssignments.findIndex(
          (c) => c.courseId === activeData.courseId
        );
        const toIndex = updatedAssignments.findIndex(
          (c) => c.courseId === overData.courseId
        );

        if (fromIndex !== -1 && toIndex !== -1) {
          if (
            updatedAssignments[fromIndex].courseGroup ===
            updatedAssignments[toIndex].courseGroup
          ) {
            const [moved] = updatedAssignments.splice(fromIndex, 1);
            updatedAssignments.splice(toIndex, 0, moved);

            onUpdateTeacher({
              ...teacher,
              courseAssignments: updatedAssignments,
            });
          }
        }
      }
    }

    setDraggedItem(null);
  };

  const columns = useMemo<ColumnDef<CalculatedTeacher>[]>(() => {
    const baseColumns: ColumnDef<CalculatedTeacher>[] = [
      {
        accessorKey: "name",
        header: "Teacher",
        size: 100,
        enableSorting: false,
        cell: ({ row }) => (
          <div
            className={clsx(
              "px-3 py-2 font-semibold",
              getDivisionColor(row.original.division)
            )}
          >
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "division",
        header: "Division",
        size: 80,
        enableSorting: false,
        cell: ({ row }) => (
          <div
            className={clsx(
              "px-3 py-2",
              getDivisionColor(row.original.division)
            )}
          >
            {row.original.division}
          </div>
        ),
      },
      {
        accessorKey: "otherRole",
        header: "Other Role",
        size: 150,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="px-3 py-2">{row.original.otherRole || "-"}</div>
        ),
      },
      {
        accessorKey: "maxLoad",
        header: "Max Load",
        size: 100,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="px-3 py-2 text-center font-semibold">
            {row.original.maxLoad}
          </div>
        ),
      },
      {
        accessorKey: "availablePeriods",
        header: "Available Periods",
        size: 120,
        enableSorting: true,
        cell: ({ row }) => (
          <div
            className={clsx(
              "px-3 py-2 text-center font-bold",
              row.original.availablePeriods < 0
                ? "text-red-600"
                : "text-green-600"
            )}
          >
            {row.original.availablePeriods}
          </div>
        ),
      },
      {
        accessorKey: "preps",
        header: "Preps",
        size: 80,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="px-3 py-2 text-center">{row.original.preps}</div>
        ),
      },
      {
        accessorKey: "totalStudents",
        header: "Students",
        size: 100,
        enableSorting: true,
        cell: ({ row }) => (
          <div className="px-3 py-2 text-center font-semibold">
            {row.original.totalStudents}
          </div>
        ),
      },
    ];

    const courseColumns: ColumnDef<CalculatedTeacher>[] = courseGroups
      .filter((group) => !collapsedCourseGroups[group])
      .map((group) => ({
        id: `course-${group}`,
        header: () => (
          <div
            className={clsx(
              "px-2 py-2 text-center font-bold",
              getCourseGroupColor(group)
            )}
          >
            {group}
          </div>
        ),
        size: 120,
        enableSorting: false,
        cell: ({ row }) => {
          const courses = row.original.courseAssignments.filter(
            (c) => c.courseGroup === group
          );
          if (courses.length === 0)
            return <div className={getCourseGroupColor(group)} />;

          return (
            <div className={clsx("px-2 py-1", getCourseGroupColor(group))}>
              <SortableContext
                items={courses.map((c) => c.courseId)}
                strategy={verticalListSortingStrategy}
              >
                {courses.map((course) => (
                  <DraggableCourseCell
                    key={course.courseId}
                    course={course}
                    teacherId={row.original.id}
                  />
                ))}
              </SortableContext>
            </div>
          );
        },
      }));

    return [...baseColumns, ...courseColumns];
  }, [courseGroups, collapsedCourseGroups]);

  const calculatedTeachers = useMemo(
    () => teachers.map(calculateTeacherMetrics),
    [teachers]
  );

  const visibleTeachers = useMemo(() => {
    return calculatedTeachers.filter(
      (teacher) => !collapsedDivisions[teacher.division]
    );
  }, [calculatedTeachers, collapsedDivisions]);

  const table = useReactTable({
    data: visibleTeachers ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  return (
    <div ref={tableContainerRef} className="flex-1 overflow-auto">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={clsx(
                      "border-r border-gray-300 text-sm font-bold",
                      header.column.getCanSort()
                        ? "cursor-pointer hover:bg-gray-200"
                        : ""
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-center px-2 py-3">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <span className="ml-1">
                          {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="border-r border-gray-200 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </DndContext>
    </div>
  );
};
