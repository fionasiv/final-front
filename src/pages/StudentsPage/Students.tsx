import * as S from "./Students.style";
import Table from "../../components/Table/Table";
import Error from "../../components/Error/Error";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import {
  addStudentToClassroom,
  deleteStudent,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { Student } from "../../interfaces";
import { useAppDispatch } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";
import { Mode } from "../../Enums";
import { ThemeContext } from "../../App";
import { SwalToast, SwalToastWithButtons } from "../../components/SwalToast/SwalToast";
import "../../components/SwalToast/SwalToast.css"

export default function Students() {
  const theme = useContext(ThemeContext);
  const notFoundImage = `images/notfound-${theme.name}.jpg`;
  const errorImage = `images/error-${theme.name}.jpg`;
  const [students, setStudents] = useState<Student[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.LOADING);
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
        setMode(Mode.SUCCESS);
      } catch (error) {
        SwalToast.fire({
          icon: "error",
          iconColor: theme.hexColor,
          title: "חלה תקלה בעת קבלת הסטודנטים, נסו שוב מאוחר יותר",
        });
        setMode(Mode.ERROR);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addStudentToClass = async (classId: string, studentId: string) => {
    try {
      await addStudentToClassroom(classId, studentId);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, classroom: classId }
            : student
        )
      );
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הסטודנט/ית התווסף/ה לכיתה בהצלחה!",
      });
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        text: "חלה תקלה בעת הוספת הסטודנט/ית לכיתה",
      });
    }
  };

  const removeStudentHandler = async (studentId: string) => {
    SwalToastWithButtons.fire({
      title: "את/ה בטוח/ה שברצונך למחוק את הסטודנט/ית?",
      icon: "warning",
      iconColor: theme.hexColor,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeStudent(studentId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        SwalToast.fire({
          icon: "error",
          iconColor: theme.hexColor,
          title: "המחיקה בוטלה",
        });
      }
    });
  };

  const removeStudent = async (studentId: string) => {
    const student = students.find((student) => student._id === studentId);
    const classId = student?.classroom;

    try {
      await deleteStudent(studentId);
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הסטודנט/ית נמחק/ה בהצלחה!",
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );

      if (classId) {
        dispatch(addClassroomSeat({ classroomId: classId }));
      }
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        text: "חלה תקלה בעת מחיקת הסטודנט/ית",
      });
    }
  };

  const studentsPage = students.length ? (
    <S.TablesSection>
      <Table
        students={students}
        addStudent={addStudentToClass}
        deleteStudent={removeStudentHandler}
      />
    </S.TablesSection>
  ) : (
    <Error
      title="לא נמצאו תלמידים..."
      descripton="נסו שנית מאוחר יותר"
      linkTitle="צרו סטודנט/ית חדש/ה"
      url="/create"
      image={notFoundImage}
    />
  );

  if (mode === Mode.ERROR) {
    return (
      <Error
        title="חלה תקלה בחיבור לשרת"
        descripton="נסו שנית מאוחר יותר"
        image={errorImage}
      />
    );
  } else if (mode === Mode.LOADING) {
    return (
      <S.ProgressBox>
        <S.Progress coloring={theme.hexColor} size={100} />
      </S.ProgressBox>
    );
  } else {
    return studentsPage;
  }
}