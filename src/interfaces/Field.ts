export default interface Field {
  id: string;
  label: string;
  check: Function;
  required?: boolean | undefined;
}
