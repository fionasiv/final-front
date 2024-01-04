import Field from "../../interfaces/Field";

export interface FormProps {
  id: string;
  fields: Field[];
  handleCreate: (newItem: any) => Promise<boolean>;
  title: string;
  createMessage: string;
}

export interface FieldCheck {
  isValid: boolean;
  invalidMsg: string;
}