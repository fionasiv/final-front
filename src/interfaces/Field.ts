import { FieldCheck } from "../components/Form/FormInterfaces";

export default interface Field {
  id: string;
  label: string;
  check: (value: any) => FieldCheck ;
  required?: boolean;
  isTouched?: boolean;
}
