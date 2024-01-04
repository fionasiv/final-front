import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { deleteClassroom } from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import { SwalToast, SwalToastWithButtons } from "../../components/SwalToast/SwalToast";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getClassrooms, getClassroomsStatus, removeClassroomFromState } from "../../store/reducers/classesSlice";
import Swal from "sweetalert2";
import Error from "../../components/Error/Error";
import { Mode } from "../../Enums";
import "../../components/SwalToast/SwalToast.css"
import { useTheme } from "../../ThemeContext";

export default function Classes() {
  const theme = useTheme();
  const classrooms = useAppSelector(getClassrooms);
  const mode = useAppSelector(getClassroomsStatus);
  const dispatch = useAppDispatch();
  const removeClassHandler = async (classId: string) => {
    const classroomStudents = await getAllStudents(`classroom/${classId}`);

    if (classroomStudents.length) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        title: "לא ניתן למחוק כיתה המכילה תלמידים",
      });
    } else {
      SwalToastWithButtons.fire({
        icon: "warning",
        iconColor: theme.hexColor,
        title: "את/ה בטוח/ה שברצונך למחוק את הכיתה?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteClass(classId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          SwalToast.fire({
            icon: "error",
            iconColor: theme.hexColor,
            title: "המחיקה בוטלה",
          });
        }
      });
    }
  };

  const deleteClass = async (classId: string) => {
    try {
      await deleteClassroom(classId);
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הכיתה נמחקה בהצלחה!",
      });
      dispatch(removeClassroomFromState({ classroomId: classId }));
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        title: "חלה תקלה בעת מחיקת הכיתה, אנא נסו שוב מאוחר יותר",
      });
    }
  };

  const shobClasses = Object.keys(classrooms).length
    ? Object.keys(classrooms).map((shobClass) => {
      return (
        <Class
          key={classrooms[shobClass]._id}
          id={classrooms[shobClass]._id}
          name={classrooms[shobClass].name}
          avilableSeats={classrooms[shobClass].seatsLeft}
          totalSeats={classrooms[shobClass].capacity}
          removeClass={removeClassHandler}
        />
      )})
    : [];

  const classesPage = Object.keys(classrooms).length ? (
    <S.ClassesList>{shobClasses}</S.ClassesList>
  ) : (
    <Error
      title="לא נמצאו כיתות..."
      description="נסו שנית מאוחר יותר"
      linkTitle="צרו כיתה חדשה"
      url="/create"
      image={`../../assets/images/notfound-${theme.name}.jpg`}
    />
  );

  if (mode === Mode.ERROR) {
    return (
      <Error
        title="חלה תקלה בחיבור לשרת"
        description="נסו שנית מאוחר יותר"
        image={`../../assets/images/error-${theme.name}.jpg`}
      />
    );
  } else if (mode === Mode.LOADING) {
    return (
      <S.ProgressBox>
        <S.Progress coloring={theme.hexColor} size={100} />
      </S.ProgressBox>
    );
  } else {
    return classesPage;
  }
}
