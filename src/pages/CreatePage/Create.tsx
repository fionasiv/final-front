import Form from "../../components/NewItemForm/NewItemForm";
import { NewClassFields, AddStudentFields } from "../../consts/FormConsts";
import * as S from "./Create.style";

export default function Create() {
  return (
    <S.Forms>
      <Form fields={NewClassFields} title="Create new class" />
      <Form fields={AddStudentFields} title="Add new student" />
    </S.Forms>
  );
}
