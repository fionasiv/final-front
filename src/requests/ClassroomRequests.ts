import { ShobClass } from "../interfaces";
import api from "./api";

export const getAllClassrooms = async () => {
  try {
    const classrooms = (await api.get("/classrooms")).data;

    return classrooms;
  } catch (error) {
    throw error;
  }
};

export const addClassroom = async (shobClass: ShobClass) => {
  try {
    await api.post("/classrooms", { shobClass });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClassroom = async (classId: string) => {
  try {
    await api.delete(`/classrooms/${classId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
