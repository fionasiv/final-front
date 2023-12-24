import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../types";
import { deleteClassroom } from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import { SwalToast, SwalToastWithButtons } from "../../consts/SwalToast";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeClassroom } from "../../store/reducers/classesSlice";
import Swal from "sweetalert2";

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
        reverseButtons: true,
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
    const isRemoved = await deleteClassroom(classId);

    if (isRemoved) {
      SwalToast.fire({
        icon: "success",
        title: "הכיתה נמחקה בהצלחה!",
      });
      dispatch(removeClassroom({ classroomId: classId }));
    } else {
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

  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
