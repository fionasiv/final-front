import { Student } from "../interfaces";
import api from "./api";

export const getAllStudents = async (path: string) => {
  try {
    const students = (await api.get(`/students/${path}`)).data;

    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addStudent = async (student: Student) => {
  try {
    await api.post("/students", { student });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await api.delete(`/students/${studentId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addStudentToClassroom = async (
  classId: string,
  studentId: string
) => {
  try {
    await api.patch(`/students/${studentId}/classroom/${classId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeStudentFromClassroom = async (studentId: string) => {
  try {
    await api.patch(`/students/${studentId}/classroom`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
