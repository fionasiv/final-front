import { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../types";
import {
  deleteClassroom,
  getAllClassrooms,
} from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import { SwalToast } from "../../requests/SwalToast";

export default function Classes() {
  const [classrooms, setClassrooms] = useState([] as ShobClass[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getAllClassrooms();
        setClassrooms(classes);
      } catch (error) {
        console.error(error);
        SwalToast.fire({
          icon: "error",
          title: "חלה תקלה בעת קבלת הכיתות, נסו שוב מאוחר יותר",
        });
      }
    };

    fetchData();
  }, []);

  const removeClass = async (classId: string) => {
    const classroomStudents = await getAllStudents(`classroom/${classId}`);

    if (classroomStudents.length) {
      SwalToast.fire({
        icon: "error",
        title: "לא ניתן למחוק כיתה המכילה תלמידים",
      });
    } else {
      const isRemoved = await deleteClassroom(classId);

      if (isRemoved) {
        SwalToast.fire({
          icon: "success",
          title: "הכיתה נמחקה בהצלחה!",
        });
        setClassrooms((prevClassrooms) => {
          return prevClassrooms.filter((classroom) => classroom._id !== classId);
        });
      } else {
        SwalToast.fire({
          icon: "error",
          title: "חלה תקלה בעת מחיקת הכיתה, אנא נסו שוב מאוחר יותר",
        });
      }
    }
  };

  const returnSeatToClass = (classId: string) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.map((classroom) =>
        classroom._id === classId
          ? { ...classroom, numberOfSeatsLeft: classroom.numberOfSeatsLeft + 1 }
          : classroom
      )
    );
  };

  const shobClasses = classrooms ? classrooms.map((shobClass: ShobClass) => (
    <Class
      key={shobClass._id}
      id={shobClass._id}
      name={shobClass.name}
      avilableSeats={shobClass.numberOfSeatsLeft}
      totalSeats={shobClass.numberOfSeats}
      removeClass={removeClass}
      returnSeatToClass={returnSeatToClass}
    />
  )) : [];
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
