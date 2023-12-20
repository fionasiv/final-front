import Form from "../../components/NewItemForm/NewItemForm";
import { NewClassFields, AddStudentFields } from "../../consts/FormConsts";
import { addClassroom } from "../../requests/ClassroomRequests";
import { addStudent } from "../../requests/StudentsRequests";
import { SwalToast } from "../../requests/SwalToast";
import { ShobClass, Student } from "../../types";
import * as S from "./Create.style";

export default function Create() {
  const addNewClassroom = async (newClass: ShobClass) => {
    await addClassroom(newClass);
  };

  const addNewStudent = async (newStudent: Student) => {
    const isAdded = await addStudent(newStudent);

    if (isAdded) {
      SwalToast.fire({
        icon: "success",
        text: "הסטודנט/ית נוסף/ה לרשימה בהצלחה!",
      });
    } else {
      SwalToast.fire({
        icon: "error",
        text: "חלה תקלה בעת הוספת הסטודנט/ית",
      });
    }
  };

  return (
    <S.Forms>
      <Form
        fields={NewClassFields}
        title="Create new class"
        createMessage="CREATE CLASS"
        handleCreate={addNewClassroom}
      />
      <Form
        fields={AddStudentFields}
        title="Add new student"
        createMessage="ADD STUDENT"
        handleCreate={addNewStudent}
      />
    </S.Forms>
  );
}
