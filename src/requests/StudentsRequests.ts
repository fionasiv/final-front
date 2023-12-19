import { API_CONNECTION_URL } from "../consts/AppConsts";
import { Student } from "../types";
import { SwalToast } from "./SwalToast";

export const getAllStudents = async (path: string) => {
  try {
    const response = await fetch(`${API_CONNECTION_URL}/students/${path}`);
    const allData = await response.json();
  
    return allData.map((student: Student) => {
      return {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
        profession: student.profession,
        classroom: student.classroom
      };
    });
  } catch (error) {
    console.error(error);
    SwalToast.fire({
      icon: "error",
      title: "חלה בעיה בעת קבלת הסטודנטים, נסה שוב מאוחר יותר",
    });
  }
};

export const addStudent = async (student: Student) => {
  try {
    const response = await fetch(`${API_CONNECTION_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
        profession: student.profession,
      }),
    });
    const newStudent = await response.json();

    if (newStudent) {
      SwalToast.fire({
        icon: "success",
        text: "הסטודנט נוסף לרשימה בהצלחה!",
      });
    }
  } catch (error) {
    console.error(error);
    SwalToast.fire({
      icon: "error",
      text: "חלה בעיה בעת הוספת הסטודנט לכיתה, נסה שוב מאוחר יותר",
    });
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await fetch(`${API_CONNECTION_URL}/students/${studentId}`, {
      method: "DELETE",
    });
    SwalToast.fire({
      icon: "success",
      title: "הסטודנט נמחק בהצלחה!"
    })
  } catch (error) {
    console.error(error);
    SwalToast.fire({
      icon: "error",
      title: "אופס...",
      text: "חלה בעיה בעת מחיקת הסטודנט, נסה שוב מאוחר יותר",
    });
  }
};

export const addStudentToClassroom = async (
  classId: string,
  studentId: string
) => {
  try {
    const response = await fetch(
      `${API_CONNECTION_URL}/students/${studentId}/classroom/${classId}`, {
        method: "PATCH",
      }
    );
    const newStudent = await response.json();

    if (newStudent.classroom !== "") {
      SwalToast.fire({
        icon: "success",
        title: "הסטודנט התווסף לכיתה בהצלחה!"
      });
    }
  } catch (error) {
    console.error(error);
    SwalToast.fire({
      icon: "error",
      title: "אופס...",
      text: "חלה בעיה בעת הוספת הסטודנט לכיתה, נסה שוב מאוחר יותר",
    });
  }
};

export const removeStudentFromClassroom = async (studentId: string) => {
  try {
    const response = await fetch(
      `${API_CONNECTION_URL}/students/${studentId}/classroom`, {
        method: "PATCH",
      }
      );
      const changedStudent = await response.json();
      
      if (changedStudent.classroom === "") {
        SwalToast.fire({
          icon: "success",
          title: "הסטודנט נמחק מהכיתה בהצלחה!"
        });
      }
    } catch (error) {
      console.error(error);
      SwalToast.fire({
        icon: "error",
        title: "אופס...",
        text: "חלה בעיה בעת מחיקת הסטודנט מהכיתה, נסה שוב מאוחר יותר",
      });
    }
  };
  