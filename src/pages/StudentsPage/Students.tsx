import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as S from "./Students.style";
import {
  addStudentToClassroom,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { getAvailableClasses } from "../../requests/ClassroomRequests";
import { Student, displayedItem } from "../../types";

export default function Students() {
  const [students, setStudents] = useState([] as Student[]);
  const [availableClasses, setAvailableClasses] = useState(
    [] as displayedItem[]
  );

  useEffect(() => {
    const fetchData = async () => {
      const studentsList = await getAllStudents("");

      setStudents(
        studentsList.map((student: Student) => {
          return {
            ...student,
            id: student._id,
          };
        })
      );
      setAvailableClasses(await getAvailableClasses());
    };
    fetchData();
  }, []);

  const addStudentToClass = async (classId: string, studentId: string) => {
    await addStudentToClassroom(classId, studentId);
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId ? { ...student, classroom: classId } : student
      )
    );
  };

  return (
    <S.TablesSection>
      <Table students={students} availableClasses={availableClasses} addStudent={addStudentToClass} />
    </S.TablesSection>
  );
}
