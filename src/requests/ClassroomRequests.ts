import { API_CONNECTION_URL } from "../consts/AppConsts";
import { ShobClass, displayedItem } from "../types";

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
    const newClassroom = await fetch("/classrooms", {
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
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const getAvailableClasses = async () => {
  try {
    const response = await fetch(`${API_CONNECTION_URL}/classrooms/available`);
    const allData = await response.json();

    return allData.map((classroom: ShobClass) => {
      return {
        id: classroom._id,
        name: classroom.name,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
