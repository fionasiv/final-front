const fieldChecks = {
  numericCheck: (value: string) => new RegExp("^[0-9]+$").test(value),
  idCheck: (value: string) => fieldChecks.numericCheck(value) && value.length > 8,
  nameCheck: (value: string) => new RegExp("^[\u0590-\u05fea-zA-Z]+$").test(value),
  onlyLettersCheck: (value: string) => new RegExp("^[\u0590-\u05fea-zA-Z\\s\\d]+$").test(value),
  seatsAmountCheck: (value: number) => value > 0 && value <= 1000,
  ageCheck: (value: number) => value > 0 && value <= 120,
};

export const NewClassFields = [
  {
    label: "Class ID",
    id: "_id",
    type: "string",
    check: fieldChecks.idCheck,
    required: true,
  },
  {
    label: "Name",
    id: "name",
    type: "string",
    check: fieldChecks.onlyLettersCheck,
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
    check: fieldChecks.nameCheck,
    required: true,
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "string",
    check: fieldChecks.nameCheck,
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
    check: fieldChecks.onlyLettersCheck,
    required: true,
  }
];
