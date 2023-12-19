import { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass } from "../../types";
import { getAllClassrooms } from "../../requests/ClassroomRequests";
import { API_CONNECTION_URL } from "../../consts/AppConsts";

export default function Classes() {
  const [classrooms, setClassrooms] = useState([] as ShobClass[]);

  useEffect(() => {
    const fetchData = async () => {
      const classes = await getAllClassrooms();
      setClassrooms(classes);
    };

    fetchData();
  }, []);

  const updateClassrooms = (updatedClassroom: ShobClass) => {
    setClassrooms((prevClassrooms) => {
      return prevClassrooms.map((classroom: ShobClass) =>
        classroom._id === updatedClassroom._id ? updatedClassroom : classroom
      );
    });
  };

  const removeClass = async (classId: string) => {
    try {
      await fetch(`${API_CONNECTION_URL}/classrooms/${classId}`, {
        method: "DELETE",
      });
      setClassrooms((prevClassrooms) => {
        return prevClassrooms.filter((classroom) => classroom._id !== classId);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const shobClasses = classrooms.map((shobClass: ShobClass) => (
    <Class
      key={shobClass._id}
      id={shobClass._id}
      name={shobClass.name}
      avilableSeats={shobClass.numberOfSeatsLeft}
      totalSeats={shobClass.numberOfSeats}
      removeClass={removeClass}
    />
  ));
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
