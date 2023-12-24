import { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../types";
import {
  deleteClassroom,
  getAllClassrooms,
} from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import { SwalToast } from "../../consts/SwalToast";
import { useAppDispatch, useAppSelector } from "../../store";
import { addClassroomSeat, removeClassroom, setClassrooms } from "../../store/reducers/classesSlice";

export default function Classes() {
  const classrooms = useAppSelector((state) => state.classrooms.classrooms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes: ShobClass[] = await getAllClassrooms();
        dispatch(setClassrooms({classrooms: classes}));
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
        dispatch(removeClassroom({classroomId: classId}))
      } else {
        SwalToast.fire({
          icon: "error",
          title: "חלה תקלה בעת מחיקת הכיתה, אנא נסו שוב מאוחר יותר",
        });
      }
    }
  };

  const shobClasses = classrooms ? classrooms.map((shobClass: ShobClass) => (
    <Class
      key={shobClass._id}
      id={shobClass._id}
      name={shobClass.name}
      avilableSeats={shobClass.numberOfSeatsLeft}
      totalSeats={shobClass.numberOfSeats}
      removeClass={removeClass}
    />
  )) : [];
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
