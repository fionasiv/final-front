import { API_CONNECTION_URL } from "../consts/AppConsts";
import { Student } from "../types";

export const getAllStudents = async (path: string) => {
  const response = await fetch(`${API_CONNECTION_URL}/students/${path}`);
  const allData = await response.json();

  return allData.map((student: Student) => {
    return {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      age: student.age,
      profession: student.profession,
    };
  });
};

export const addStudent = async (student: Student) => {
  try {
    const response = await fetch("/students", {
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
      return "student has been added successfully";
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await fetch(`${API_CONNECTION_URL}/students/${studentId}`, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (error) {
    console.error(error);
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
      return "student has been added to classroom successfully";
    }
  } catch (error) {
    console.error(error);
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
        return "student has been removed from classroom successfully";
      }
    } catch (error) {
      console.error(error);
    }
  };
  