import Swal from "sweetalert2";
import { API_CONNECTION_URL } from "./api";
import { ShobClass, displayedItem } from "../types";
import { SwalToast } from "./SwalToast";
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
    const newClassroom = await fetch(`${API_CONNECTION_URL}/classrooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: shobClass._id,
        name: shobClass.name,
        numberOfSeats: shobClass.numberOfSeats,
      }),
    });
    
    if (newClassroom) {
      SwalToast.fire({
        icon: "success",
        text: "הכיתה נוספה לרשימה בהצלחה!",
      });
    }
  } catch (error) {
    console.log(error);
    SwalToast.fire({
      icon: "error",
      text: "חלה תקלה בעת הוספת הכיתה, נסו שוב מאוחר יותר",
    });
  }
};

export const deleteClassroom = async (classId: string) => {
    try {
      await fetch(`${API_CONNECTION_URL}/classrooms/${classId}`, {
        method: "DELETE",
      });
      SwalToast.fire({
        icon: "success",
        title: "הכיתה נמחקה בהצלחה!",
      });
    } catch (error) {
      console.error(error);
      SwalToast.fire({
        icon: "error",
        title: "חלה תקלה בעת מחיקת הכיתה, אנא נסו שוב מאוחר יותר",
      });
    }
  
};

export const getAvailableClasses = async () => {
  try {
    const response = await fetch(`${API_CONNECTION_URL}/classrooms/available`);
    const allData = await response.json();

    return allData.map((classroom: displayedItem) => {
      return {
        id: classroom.id,
        name: classroom.name,
      };
    });
  } catch (error) {
    console.error(error);
    SwalToast.fire({
      icon: "error",
      title: "חלה תקלה בעת קבלת הכיתות הזמינות, נסו שוב מאוחר יותר",
    });
  }
};
