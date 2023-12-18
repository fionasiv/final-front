import React, { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass, Student } from "../../types";
import { API_CONNECTION_URL } from "../../consts/AppConsts";
import { getAllClassrooms } from "../../requests/ClassroomRequests";

export default function Classes() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classes = await getAllClassrooms();
      setClassrooms(classes);
    };

    fetchData();
  }, []);

  const shobClasses = classrooms.map((shobClass: ShobClass) => (
    <Class
      key={shobClass._id}
      id={shobClass._id}
      name={shobClass.name}
      avilableSeats={shobClass.numberOfSeatsLeft}
      totalSeats={shobClass.numberOfSeats}
    />
  ));
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}
