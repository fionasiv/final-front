import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as S from "./Students.style";
import {
  addStudentToClassroom,
  deleteStudent,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { getAvailableClasses } from "../../requests/ClassroomRequests";
import { Student, displayedItem } from "../../types";
import { SwalToast } from "../../consts/SwalToast";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [availableClasses, setAvailableClasses] = useState<displayedItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsList = await getAllStudents("");

        setStudents(
          studentsList.map((student: Student) => {
            return {
              ...student,
              id: student._id,
            };
          })
        );
      } catch (error) {
        SwalToast.fire({
          icon: "error",
          title: "חלה תקלה בעת קבלת הכיתות הזמינות, נסו שוב מאוחר יותר",
        });

        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getAvailableClasses();
        setAvailableClasses(classes);
      } catch (error) {
        SwalToast.fire({
          icon: "error",
          title: "חלה תקלה בעת קבלת הסטודנטים, נסו שוב מאוחר יותר",
        });
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addStudentToClass = async (classId: string, studentId: string) => {
    const isAdded = await addStudentToClassroom(classId, studentId);

    if (isAdded) {
      SwalToast.fire({
        icon: "success",
        title: "הסטודנט/ית התווסף/ה לכיתה בהצלחה!",
      });
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, classroom: classId }
            : student
        )
      );
    } else {
      SwalToast.fire({
        icon: "error",
        title: "אופס...",
        text: "חלה תקלה בעת הוספת הסטודנט/ית לכיתה, נסו שוב מאוחר יותר",
      });
    }
  };

  const removeStudent = async (studentId: string) => {
    const isRemoved = await deleteStudent(studentId);

    if (isRemoved) {
      SwalToast.fire({
        icon: "success",
        title: "הסטודנט/ית נמחק/ה בהצלחה!",
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } else {
      SwalToast.fire({
        icon: "error",
        title: "אופס...",
        text: "חלה תקלה בעת מחיקת הסטודנט/ית, נסו שוב מאוחר יותר",
      });
    }
  };

  return (
    <S.TablesSection>
      <Table
        students={students}
        availableClasses={availableClasses}
        addStudent={addStudentToClass}
        deleteStudent={removeStudent}
      />
    </S.TablesSection>
  );
}
