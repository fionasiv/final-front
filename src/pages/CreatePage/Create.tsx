import * as S from "./Create.style";
import Form from "../../components/Form/Form";
import { NewClassFields, AddStudentFields } from "../../consts/FormConsts";
import { addClassroom } from "../../requests/ClassroomRequests";
import { addStudent } from "../../requests/StudentsRequests";
import { ShobClass, Student } from "../../interfaces";
import { useAppDispatch } from "../../store/store";
import { addClassroomToState } from "../../store/reducers/classesSlice";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { SwalToast } from "../../components/SwalToast/SwalToast";
import "../../components/SwalToast/SwalToast.css"

export default function Create() {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const addNewClassroom = async (newClass: ShobClass) => {
    try {
      await addClassroom(newClass);

      const newClassroom = {
        ...newClass,
        seatsLeft: newClass.capacity,
      };
      dispatch(addClassroomToState({ classroom: newClassroom }));
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הכיתה נוספה לרשימה בהצלחה!",
      });

      return true;
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        title: "חלה תקלה בעת הוספת הכיתה, נסו שוב מאוחר יותר",
      });

      return false;
    }
  };

  const addNewStudent = async (newStudent: Student) => {
    try {
      await addStudent(newStudent);

      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הסטודנט/ית נוסף/ה לרשימה בהצלחה!",
      });

      return true;
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        title: "חלה תקלה בעת הוספת הסטודנט/ית",
      });

      return false;
    }
  };

  return (
    <S.Forms>
      <Form
        id="new-class"
        fields={NewClassFields}
        title="Create new class"
        createMessage="CREATE CLASS"
        handleCreate={addNewClassroom}
      />
      <Form
        id="new-student"
        fields={AddStudentFields}
        title="Add new student"
        createMessage="ADD STUDENT"
        handleCreate={addNewStudent}
      />
    </S.Forms>
  );
}
