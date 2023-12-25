import { API_CONNECTION_URL } from "./api";
import { Student } from "../interfaces";
import api from "./api";

export const getAllStudents = async (path: string) => {
  try {
    const students = (await api.get(`/students/${path}`)).data;

    return students;
  } catch (error) {
    throw error;
  }
};

export const addStudent = async (student: Student) => {
  try {
    await api.post("/students", { student });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await api.delete(`${API_CONNECTION_URL}/students/${studentId}`);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const addStudentToClassroom = async (
  classId: string,
  studentId: string
) => {
  try {
    await api.patch(
      `${API_CONNECTION_URL}/students/${studentId}/classroom/${classId}`
    );

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const removeStudentFromClassroom = async (studentId: string) => {
  try {
    await api.patch(`${API_CONNECTION_URL}/students/${studentId}/classroom`);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};
