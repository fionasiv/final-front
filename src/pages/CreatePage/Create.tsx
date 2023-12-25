import Form from "../../components/NewItemForm/NewItemForm";
import { NewClassFields, AddStudentFields } from "../../consts/FormConsts";
import { addClassroom } from "../../requests/ClassroomRequests";
import { addStudent } from "../../requests/StudentsRequests";
import { SwalToast } from "../../consts/SwalToast";
import { ShobClass, Student } from "../../types";
import * as S from "./Create.style";
import { useAppDispatch } from "../../store/store";
import { addClassroomToState } from "../../store/reducers/classesSlice";

export default function Create() {
  const dispatch = useAppDispatch();

  const addNewClassroom = async (newClass: ShobClass) => {
    const isCreated = await addClassroom(newClass);

    if (isCreated) {
      const newClassroom = {
        ...newClass,
        seatsLeft: newClass.capacity
      }
      dispatch(addClassroomToState({ classroom: newClassroom }));
      SwalToast.fire({
        icon: "success",
        text: "הכיתה נוספה לרשימה בהצלחה!",
      });

      return true;
    } else {
      SwalToast.fire({
        icon: "error",
        text: "חלה תקלה בעת הוספת הכיתה, נסו שוב מאוחר יותר",
      });

      return false;
    }
  };

  const addNewStudent = async (newStudent: Student) => {
    const isAdded = await addStudent(newStudent);

    if (isAdded) {
      SwalToast.fire({
        icon: "success",
        text: "הסטודנט/ית נוסף/ה לרשימה בהצלחה!",
      });

      return true;
    } else {
      SwalToast.fire({
        icon: "error",
        text: "חלה תקלה בעת הוספת הסטודנט/ית",
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
