import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../interfaces";
import { deleteClassroom } from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import { SwalToast, SwalToastWithButtons } from "../../consts/SwalToast";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeClassroomFromState } from "../../store/reducers/classesSlice";
import Swal from "sweetalert2";
import NotFound from "../../components/NotFound/NotFound";

export default function Classes() {
  const classrooms = useAppSelector((state) => state.classrooms.data);
  const dispatch = useAppDispatch();

  const removeClassHandler = async (classId: string) => {
    const classroomStudents = await getAllStudents(`classroom/${classId}`);

    if (classroomStudents.length) {
      SwalToast.fire({
        icon: "error",
        title: "לא ניתן למחוק כיתה המכילה תלמידים",
      });
    } else {
      SwalToastWithButtons.fire({
        title: "את/ה בטוח/ה שברצונך למחוק את הכיתה?",
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteClass(classId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          SwalToast.fire({
            title: "המחיקה בוטלה",
            icon: "error",
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
        title: "הכיתה נמחקה בהצלחה!",
      });
      dispatch(removeClassroomFromState({ classroomId: classId }));
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        title: "חלה תקלה בעת מחיקת הכיתה, אנא נסו שוב מאוחר יותר",
      });
    }
  };

  const shobClasses = classrooms
    ? classrooms.map((shobClass: ShobClass) => (
        <Class
          key={shobClass._id}
          id={shobClass._id}
          name={shobClass.name}
          avilableSeats={shobClass.seatsLeft}
          totalSeats={shobClass.capacity}
          removeClass={removeClassHandler}
        />
      ))
    : [];

  const classesPage = classrooms.length ? (
    <S.ClassesList>{shobClasses}</S.ClassesList>
  ) : (
    <NotFound
      title="לא נמצאו כיתות..."
      descripton="נסו שנית מאוחר יותר"
      linkTitle="צרו כיתה חדשה"
      url="/create"
    />
  );

  return classesPage;
}
