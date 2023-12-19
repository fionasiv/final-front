import Swal from "sweetalert2";
import { API_CONNECTION_URL } from "../consts/AppConsts";
import { ShobClass, displayedItem } from "../types";
import { SwalToast } from "./SwalToast";


export const getAllClassrooms = async () => {
  const response = await fetch(`${API_CONNECTION_URL}/classrooms`);
  const allData = await response.json();
  
  return allData.map((classroom: ShobClass) => {
    return {
      _id: classroom._id,
      name: classroom.name,
      numberOfSeatsLeft: classroom.numberOfSeatsLeft,
      numberOfSeats: classroom.numberOfSeats,
    };
  });
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
      return "class has been added successfully";
    }
  } catch (error) {
    console.log(error);
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
  }
};
