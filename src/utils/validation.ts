import { FieldCheck } from "../components/Form/FormInterfaces";

export const numericCheck = (value: string): FieldCheck => {
  const isValid = new RegExp("^[0-9]+$").test(value);

  return { isValid: isValid, invalidMsg: "אנא הזינו רק מספרים" };
};

export const idCheck = (value: string): FieldCheck => {
  const isValid = numericCheck(value).isValid && value.length === 9;
  let message = "";

  if (!numericCheck(value).isValid) {
    message = numericCheck(value).invalidMsg;
  } else if (value.length !== 9) {
    message = "אנא הזינו מזהה באורך 9 תווים";
  }

  return { isValid: isValid, invalidMsg: message };
};

export const onlyLettersCheck = (value: string): FieldCheck => {
  const isValid = new RegExp("^[\u0590-\u05fea-zA-Z]+$").test(value);

  return {
    isValid: isValid,
    invalidMsg: "אנא הזינו רק אותיות בעברית או באנגלית",
  };
};

export const nameCheck = (value: string): FieldCheck => {
  const isValid = new RegExp("^[\u0590-\u05fea-zA-Z\\s\\d]+$").test(value);

  return {
    isValid: isValid,
    invalidMsg: "אנא הזינו רק אותיות, מספרים או רווחים",
  };
};

export const seatsAmountCheck = (value: number): FieldCheck => {
  const isNumeric = numericCheck(value.toString());
  const isValid = value > 0 && value <= 1000 && isNumeric.isValid;
  let message = "";

  if (value < 0) {
    message = "כמות הכיסאות הזמינים לא יכולה להיות שלילית";
  } else if (value > 1000) {
    message = "כמות הכיסאות לא תקינה";
  } else if (!isNumeric.isValid) {
    message = isNumeric.invalidMsg;
  }

  return { isValid: isValid, invalidMsg: message };
};

export const ageCheck = (value: number): FieldCheck => {
  const isNumeric = numericCheck(value.toString());
  const isValid = value > 0 && value <= 120 && isNumeric.isValid;
  let message = "";

  if (value < 0) {
    message = "גיל לא יכול להיות שלילי";
  } else if (value > 120) {
    message = "גיל לא תקני";
  } else if (!isNumeric.isValid) {
    message = isNumeric.invalidMsg;
  }

  return { isValid: isValid, invalidMsg: message };
};
