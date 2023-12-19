const fieldChecks = {
  numericCheck: (value: string) => new RegExp("^[0-9]+$").test(value),
  onlyLettersCheck: (value: string) => new RegExp("^[a-zA-Z\u0590-\u05fe]+$").test(value),
  seatsAmountCheck: (value: number) => value > 0 && value <= 1000,
  ageCheck: (value: number) => value > 0 && value <= 120,
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
    check: fieldChecks.onlyLettersCheck,
    required: true,
  },
  {
    label: "Max Seats",
    id: "numberOfSeats",
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
    check: fieldChecks.numericCheck,
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
    check: fieldChecks.onlyLettersCheck,
    required: true,
  }
];
