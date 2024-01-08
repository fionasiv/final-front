import * as S from "./Students.style";
import Table from "../../components/Table/Table";
import Error from "../../components/Error/Error";
import Swal from "sweetalert2";
import {
  addStudentToClassroom,
  deleteStudent,
} from "../../requests/StudentsRequests";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";
import { Mode } from "../../Enums";
import { SwalToast, SwalToastWithButtons } from "../../components/SwalToast/SwalToast";
import "../../components/SwalToast/SwalToast.css"
import { getStudentsStatus, updateStudentClass, removeStudentFromState } from "../../store/reducers/studentsSlice";
import { useTheme } from "../../contexts/Theme";

export default function Students() {
  const theme = useTheme();
  const notFoundImage = `images/notfound-${theme.name}.jpg`;
  const errorImage = `images/error-${theme.name}.jpg`;
  const students = useAppSelector((state) => state.students.data);
  const formattedStudents = Object.keys(students).map((studentId) => {
    const student = students[studentId];
     return {
      ...student,
      id: student._id,
     }
  })
  const mode = useAppSelector(getStudentsStatus);
  const dispatch = useAppDispatch();

  const addStudentToClass = async (classId: string, studentId: string) => {
    try {
      await addStudentToClassroom(classId, studentId);
      dispatch(updateStudentClass({ classroomId: classId, studentId: studentId }));
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
    const student = students[studentId];
    const classId = student?.classroom;

    try {
      await deleteStudent(studentId);
      dispatch(removeStudentFromState({ studentId: studentId }));
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הסטודנט/ית נמחק/ה בהצלחה!",
      });

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

  const studentsPage = Object.keys(students).length ? (
    <S.TablesSection>
      <Table
        dataList={formattedStudents}
        addItem={addStudentToClass}
        deleteItem={removeStudentHandler}
      />
    </S.TablesSection>
  ) : (
    <Error
      title="לא נמצאו תלמידים..."
      description="נסו שנית מאוחר יותר"
      linkTitle="צרו סטודנט/ית חדש/ה"
      url="/create"
      image={notFoundImage}
    />
  );

  if (mode === Mode.ERROR) {
    return (
      <Error
        title="חלה תקלה בחיבור לשרת"
        description="נסו שנית מאוחר יותר"
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