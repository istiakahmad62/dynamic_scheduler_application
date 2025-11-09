"use client";

import { Scheduler } from "@/components/scheduler";
import { useFetchTeachers } from "@/hooks/useFetchTeachers";
import { useUpdateTeacher } from "@/hooks/useUpdateTeacher";

export default function Home() {
  const {
    data: teachers,
    refetch: refetchTeachersData,
    isLoading: teacherIsLoading,
    isError: teacherIsError,
    error: teacherDataError,
  } = useFetchTeachers();

  const { mutate: updateTeacherCourse, data: updatedTeacherData } =
    useUpdateTeacher();

  if (teacherIsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-700">Error</h2>
          <p className="text-red-600">{teacherDataError?.message}</p>
          <button onClick={() => refetchTeachersData()}>Retry</button>
        </div>
      </div>
    );
  }

  if (teacherIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Loading scheduler data...</p>
      </div>
    );
  }

  return (
    <Scheduler
      teachers={
        teachers?.map((teacher) =>
          teacher?.id === updatedTeacherData?.id ? updatedTeacherData : teacher
        ) ?? []
      }
      onUpdateTeacher={updateTeacherCourse}
    />
  );
}
