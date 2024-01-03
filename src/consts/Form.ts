import { FieldCheck } from "../components/Form/FormInterfaces";
import Field from "../interfaces/Field";

const fieldChecks = {
  numericCheck: (value: string): FieldCheck => {
    const isValid = new RegExp("^[0-9]+$").test(value);

    return { isValid: isValid, invalidMsg: "אנא הזינו רק מספרים" };
  },
  idCheck: (value: string): FieldCheck => {
    const isValid = fieldChecks.numericCheck(value).isValid && value.length === 9;
    let message = "";

    if (!fieldChecks.numericCheck(value).isValid) {
      message = fieldChecks.numericCheck(value).invalidMsg
    } else if (value.length !== 9) {
      message = "אנא הזינו מזהה באורך 9 תווים"
    }

    return { isValid: isValid, invalidMsg: message }
  },
  onlyLettersCheck: (value: string): FieldCheck => {
    const isValid = new RegExp("^[\u0590-\u05fea-zA-Z]+$").test(value);

    return { isValid: isValid, invalidMsg: "אנא הזינו רק אותיות בעברית או באנגלית" };
  },
  nameCheck: (value: string): FieldCheck => {
    const isValid = new RegExp("^[\u0590-\u05fea-zA-Z\\s\\d]+$").test(value);

    return { isValid: isValid, invalidMsg: "אנא הזינו רק אותיות, מספרים או רווחים" };
  },
  seatsAmountCheck: (value: number): FieldCheck => {
    const isValid = value > 0 && value <= 1000 && fieldChecks.numericCheck(value.toString()).isValid;
    let message = "";

    if (value < 0) {
      message = "כמות הכיסאות הזמינים לא יכולה להיות שלילית"
    } else if (value > 1000) {
      message = "כמות הכיסאות לא תקינה"
    } else if (!fieldChecks.numericCheck(value.toString()).isValid) {
      message = fieldChecks.numericCheck(value.toString()).invalidMsg
    }

    return { isValid: isValid, invalidMsg: message }
  },
  ageCheck: (value: number): FieldCheck => {
    const isValid = value > 0 && value <= 120 && fieldChecks.numericCheck(value.toString()).isValid;
    let message = "";

    if (value < 0) {
      message = "גיל לא יכול להיות שלילי"
    } else if (value > 120) {
      message = "גיל לא תקני"
    } else if (!fieldChecks.numericCheck(value.toString()).isValid) {
      message = fieldChecks.numericCheck(value.toString()).invalidMsg
    }

    return { isValid: isValid, invalidMsg: message }
  },
};

export const NewClassFields: Field[] = [
  {
    label: "Class ID",
    id: "_id",
    check: fieldChecks.numericCheck,
    required: true,
  },
  {
    label: "Name",
    id: "name",
    check: fieldChecks.nameCheck,
    required: true,
  },
  {
    label: "Max Seats",
    id: "capacity",
    check: fieldChecks.seatsAmountCheck,
    required: true,
  },
];

export const AddStudentFields = [
  {
    label: "ID",
    id: "_id",
    check: fieldChecks.idCheck,
    required: true,
  },
  {
    label: "First Name",
    id: "firstName",
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Age",
    id: "age",
    check: fieldChecks.ageCheck,
  },
  {
    label: "Profession",
    id: "profession",
    check: fieldChecks.nameCheck,
    required: true,
  },
];
