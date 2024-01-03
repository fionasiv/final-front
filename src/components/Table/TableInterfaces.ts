import Student from "../../interfaces/Student";

export interface TableProps {
  addItem: Function;
  deleteItem: Function;
  dataList: Student[];
}
