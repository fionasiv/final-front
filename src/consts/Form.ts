import Field from "../interfaces/Field";
import { numericCheck, nameCheck, seatsAmountCheck, idCheck, onlyLettersCheck, ageCheck } from "../utils/validation";

export const NewClassFields: Field[] = [
  {
    label: "Class ID",
    id: "_id",
    check: numericCheck,
    required: true,
  },
  {
    label: "Name",
    id: "name",
    check: nameCheck,
    required: true,
  },
  {
    label: "Max Seats",
    id: "capacity",
    check: seatsAmountCheck,
    required: true,
  },
];

export const AddStudentFields: Field[] = [
  {
    label: "ID",
    id: "_id",
    check: idCheck,
    required: true,
  },
  {
    label: "First Name",
    id: "firstName",
    check: onlyLettersCheck,
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    check: onlyLettersCheck,
    required: true,
  },
  {
    label: "Age",
    id: "age",
    check: ageCheck,
  },
  {
    label: "Profession",
    id: "profession",
    check: nameCheck,
    required: true,
  },
];
