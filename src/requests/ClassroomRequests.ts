import { API_CONNECTION_URL } from "./api";
import { ShobClass } from "../types";
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

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const deleteClassroom = async (classId: string) => {
  try {
    await api.delete(`${API_CONNECTION_URL}/classrooms/${classId}`);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const getAvailableClasses = async () => {
  try {
    const availableClasses = (
      await api.get(`${API_CONNECTION_URL}/classrooms/available`)
    ).data;

    return availableClasses;
  } catch (error) {
    throw error;
  }
};
