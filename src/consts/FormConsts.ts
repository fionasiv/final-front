import { FieldCheck } from "../interfaces";

const fieldChecks = {
  numericCheck: (value: string): FieldCheck => {
    const isValid = new RegExp("^[0-9]+$").test(value);

    return { isValid: isValid, invalidMsg: "אנא הזינו רק מספרים" };
  },
  idCheck: (value: string): FieldCheck => {
    const isValid = fieldChecks.numericCheck(value).isValid && value.length > 8;
    let message = "";

    if (!fieldChecks.numericCheck(value).isValid) {
      message = fieldChecks.numericCheck(value).invalidMsg
    } else if (value.length < 9) {
      message = "אנא הזינו מזהה באורך 9 תווים לפחות"
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
    const isValid = value > 0 && value <= 1000;
    let message = "";

    if (value < 0) {
      message = "כמות הכיסאות הזמינים לא יכולה להיות שלילית"
    } else if (value > 1000) {
      message = "כמות הכיסאות לא תקינה"
    }

    return { isValid: isValid, invalidMsg: message }
  },
  ageCheck: (value: number): FieldCheck => {
    const isValid = value > 0 && value <= 120;
    let message = "";

    if (value < 0) {
      message = "גיל לא יכול להיות שלילי"
    } else if (value > 120) {
      message = "גיל לא תקני"
    }

    return { isValid: isValid, invalidMsg: message }
  },
};

export const NewClassFields = [
  {
    label: "Class ID",
    id: "_id",
    type: "string",
    check: fieldChecks.numericCheck,
    required: true,
  },
  {
    label: "Name",
    id: "name",
    type: "string",
    check: fieldChecks.nameCheck,
    required: true,
  },
  {
    label: "Max Seats",
    id: "capacity",
    type: "number",
    check: fieldChecks.seatsAmountCheck,
    required: true,
  },
];

export const AddStudentFields = [
  {
    label: "ID",
    id: "_id",
    type: "string",
    check: fieldChecks.idCheck,
    required: true,
  },
  {
    label: "First Name",
    id: "firstName",
    type: "string",
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "string",
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Age",
    id: "age",
    type: "number",
    check: fieldChecks.ageCheck,
  },
  {
    label: "Profession",
    id: "profession",
    type: "string",
    check: fieldChecks.nameCheck,
    required: true,
  },
];
