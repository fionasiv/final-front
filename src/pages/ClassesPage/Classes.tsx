import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { classes, students } from "../../consts/AppConsts";
import { ShobClass } from "../../types";

export default function Classes() {
  const shobClasses = classes.map((shobClass: ShobClass) => (
    <Class
      name={shobClass.name}
      avilableSeats={shobClass.availableSeats}
      totalSeats={shobClass.totalSeats}
      students={students}
    />
  ));
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
