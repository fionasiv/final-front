import ShobClass from "../interfaces/ShobClass";
import axios from "axios";
import { API_CONNECTION_URL } from "./api";

const api = axios.create({
  baseURL: `${API_CONNECTION_URL}/classrooms/`,
});

export const getAllClassrooms = async () => {
  try {
    const classrooms = (await api.get("")).data;

    return classrooms;
  } catch (error) {
    throw error;
  }
};

export const addClassroom = async (shobClass: ShobClass) => {
  try {
    await api.post("", { shobClass });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClassroom = async (classId: string) => {
  try {
    await api.delete("", {data: { id: classId} });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
