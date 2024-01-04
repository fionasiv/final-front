import Student from "../../interfaces/Student";

export interface TableProps {
  addItem: (classId: string, studentId: string) => Promise<void>;
  deleteItem: (studentId: string) => Promise<void>;
  dataList: Student[];
}
