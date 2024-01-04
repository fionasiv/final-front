import axios from "axios";
import Student from "../interfaces/Student";
import { API_CONNECTION_URL } from "./api";

const api = axios.create({
  baseURL: `${API_CONNECTION_URL}/students/`,
});

export const getAllStudents = async (path: string) => {
  try {
    const students = (await api.get(path)).data;

    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addStudent = async (student: Student) => {
  try {
    await api.post("", { student });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await api.delete(studentId);
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
    await api.patch(`${studentId}/classroom/${classId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeStudentFromClassroom = async (studentId: string) => {
  try {
    await api.patch(`${studentId}/classroom`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
