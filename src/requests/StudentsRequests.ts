import axios from "axios";
import Student from "../interfaces/Student";
import { API_CONNECTION_URL } from "./api";

const api = axios.create({
  baseURL: `${API_CONNECTION_URL}/students/`,
});

export const getAllStudents = async () => {
  try {
    const students = (await api.get("")).data;

    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClassroomStudents = async (classroomId: string) => {
  try {
    const students = (await api.get("classroom", { data: { id: classroomId } }))
      .data;

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
    await api.delete("", {data: {id: studentId}});
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
    await api.patch("classroom/new", { id: studentId, classId: classId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeStudentFromClassroom = async (studentId: string) => {
  try {
    await api.patch("classroom", { id: studentId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
