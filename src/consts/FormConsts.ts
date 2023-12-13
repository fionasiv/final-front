const fieldChecks = {
  numericCheck: (value: string) => new RegExp("^[0-9]+$").test(value),
  onlyLettersCheck: (value: string) => new RegExp("^[A-Za-z]+$").test(value),
  seatsAmountCheck: (value: number) => value > 0 && value <= 1000,
  ageCheck: (value: number) => value > 0 && value <= 120,
};

export const NewClassFields = [
  {
    label: "Class ID",
    id: "class-id",
    type: "string",
    check: fieldChecks.numericCheck,
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
    id: "max-seats",
    type: "number",
    check: fieldChecks.seatsAmountCheck,
    required: true,
  },
];

export const AddStudentFields = [
  {
    label: "ID",
    id: "id",
    type: "string",
    check: fieldChecks.numericCheck,
    required: true,
  },
  {
    label: "First Name",
    id: "first-name",
    type: "string",
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Last Name",
    id: "last-name",
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
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
];
