import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as S from "./Students.style";
import {
  addStudentToClassroom,
  deleteStudent,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { Student } from "../../types";
import { SwalToast, SwalToastWithButtons } from "../../consts/SwalToast";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const dispatch = useAppDispatch();

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

  const removeStudentHandler = async (studentId: string) => {
    SwalToastWithButtons.fire({
      title: "את/ה בטוח/ה שברצונך למחוק את הסטודנט/ית?",
      icon: "warning",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeStudent(studentId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        SwalToast.fire({
          title: "המחיקה בוטלה",
          icon: "error",
        });
      }
    });
  };

  const removeStudent = async (studentId: string) => {
    const student = students.find((student) => student._id === studentId);
    const classId = student ? student.classroom : null;
    const isRemoved = await deleteStudent(studentId);

    if (isRemoved) {
      SwalToast.fire({
        icon: "success",
        title: "הסטודנט/ית נמחק/ה בהצלחה!",
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      if (classId) {
        dispatch(addClassroomSeat({ classroomId: classId }));
      }
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
        addStudent={addStudentToClass}
        deleteStudent={removeStudentHandler}
      />
    </S.TablesSection>
  );
}
