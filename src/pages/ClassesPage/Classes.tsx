import { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../types";
import {
  deleteClassroom,
  getAllClassrooms,
} from "../../requests/ClassroomRequests";
import { getAllStudents } from "../../requests/StudentsRequests";
import Swal from "sweetalert2";

export default function Classes() {
  const [classrooms, setClassrooms] = useState([] as ShobClass[]);

  useEffect(() => {
    const fetchData = async () => {
      const classes = await getAllClassrooms();
      setClassrooms(classes);
    };

    fetchData();
  }, []);

  const removeClass = async (classId: string) => {
    const classroomStudents = await getAllStudents(`classroom/${classId}`);

    if (classroomStudents.length) {
      Swal.fire({
        icon: "error",
        title: "לא ניתן למחוק כיתה המכילה תלמידים",
      });
    } else {
      await deleteClassroom(classId);
      setClassrooms((prevClassrooms) => {
        return prevClassrooms.filter((classroom) => classroom._id !== classId);
      });
    }
  };

  const removeStudentFromClass = (classId: string) => {
    setClassrooms((prevClassrooms) =>
      prevClassrooms.map((classroom) =>
        classroom._id === classId
          ? { ...classroom, numberOfSeatsLeft: classroom.numberOfSeatsLeft + 1 }
          : classroom
      )
    );
  };

  const shobClasses = classrooms.map((shobClass: ShobClass) => (
    <Class
      key={shobClass._id}
      id={shobClass._id}
      name={shobClass.name}
      avilableSeats={shobClass.numberOfSeatsLeft}
      totalSeats={shobClass.numberOfSeats}
      removeClass={removeClass}
      removeStudentFromClass={removeStudentFromClass}
    />
  ));
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
