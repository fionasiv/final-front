import { useContext, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import * as S from "./Students.style";
import {
  addStudentToClassroom,
  deleteStudent,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { Student } from "../../interfaces";
import { SwalToast, SwalToastWithButtons } from "../../consts/SwalToast";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";
import Error from "../../components/Error/Error";
import { Mode, Themes } from "../../Enums";
import { ThemeContext } from "../../App";
import NotFoundPurple from "../../assets/images/notfound-purple.jpg";
import NotFoundRed from "../../assets/images/notfound-red.png";
import ErrorPurple from "../../assets/images/error-purple.jpg";
import ErrorRed from "../../assets/images/error-red.png";

export default function Students() {
  const theme = useContext(ThemeContext);
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
      addStudentToClassroom(classId, studentId);
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
    } catch (error) {
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

    try {
      await deleteStudent(studentId);
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
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        title: "אופס...",
        text: "חלה תקלה בעת מחיקת הסטודנט/ית, נסו שוב מאוחר יותר",
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
      image={theme === Themes.PURPLE_MODE? NotFoundPurple : NotFoundRed}
    />
  );

  if (mode === Mode.ERROR) {
    return (
      <Error
        title="חלה תקלה בחיבור לשרת"
        descripton="נסו שנית מאוחר יותר"
        image={theme === Themes.PURPLE_MODE ? ErrorPurple : ErrorRed}
      />
    );
  } else if (mode === Mode.LOADING) {
    return (
      <S.ProgressBox>
        <S.Progress coloring={theme} size={100} />
      </S.ProgressBox>
    );
  } else {
    return studentsPage;
  }
}
